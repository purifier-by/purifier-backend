import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import { SubCategoryDto } from './subCategory.dto';
import { SubCategoryModel } from './subCategory.model';

@Injectable()
export class SubCategoriesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    const domain = this.configService.get('DOMAIN');

    const databaseResponse = await this.databaseService.runQuery(`
            SELECT id, title, 
                   description, slug,  CONCAT('${domain}/', image) AS "image", "categoryId" FROM sub_categories
        `);

    return databaseResponse.rows.map(
      (databaseRow) => new SubCategoryModel(databaseRow),
    );
  }

  async getBySlug(slug: string) {
    const domain = this.configService.get('DOMAIN');

    const categoryResponse = await this.databaseService.runQuery(
      `
        SELECT
        id,
        description, 
        slug,
        title,
        CONCAT('${domain}/', image) as "image",
        "categoryId"
        FROM sub_categories
        WHERE sub_categories.slug = $1
        `,
      [slug],
    );
    const categoryEntity = categoryResponse.rows[0];

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    return new SubCategoryModel({ ...categoryEntity });
  }

  async getById(id: number) {
    const domain = this.configService.get('DOMAIN');

    const categoryResponse = await this.databaseService.runQuery(
      `
          SELECT
          id,
          slug,
          description, 
          title,
          CONCAT('${domain}/', image) as "image",
          "categoryId"
          FROM sub_categories
          WHERE sub_categories.id=$1
          `,
      [id],
    );
    const categoryEntity = categoryResponse.rows[0];

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    return new SubCategoryModel({ ...categoryEntity });
  }

  async create(categoryData: SubCategoryDto) {
    const client = await this.databaseService.getPoolClient();
    try {
      await client.query('BEGIN;');
      const categoryResponse = await client.query(
        `
              INSERT INTO sub_categories (
                title,
                image,
                description, 
                slug,
                "categoryId"
              ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
              ) RETURNING *
            `,
        [
          categoryData.title,
          categoryData.slug,
          categoryData.description,
          categoryData.image,
          categoryData.categoryId,
        ],
      );

      const categoryEntity = categoryResponse.rows[0];

      await client.query(`COMMIT;`);
      return this.getById(categoryEntity.id);
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id: number, categoryData: SubCategoryDto) {
    const client = await this.databaseService.getPoolClient();

    try {
      await client.query('BEGIN;');

      const categoryResponse = await client.query(
        `
          UPDATE sub_categories
          SET title = $2, image = $3, slug = $4, "categoryId" = $5, description = $6
          WHERE id = $1
          RETURNING *
      `,
        [
          id,
          categoryData.title,
          categoryData.image,
          categoryData.slug,
          categoryData.categoryId,
          categoryData.description,
        ],
      );

      const categoryEntity = categoryResponse.rows[0];
      if (!categoryEntity) {
        throw new NotFoundException();
      }

      await client.query(`COMMIT;`);
      return this.getById(id);
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }
  async delete(id: number) {
    const client = await this.databaseService.getPoolClient();

    try {
      await client.query(
        `UPDATE products set "categoryId" = NULL where "categoryId" = $1 RETURNING *`,
        [id],
      );

      const databaseResponse = await client.query(
        `DELETE FROM sub_categories WHERE id=$1`,
        [id],
      );

      if (databaseResponse.rowCount === 0) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
