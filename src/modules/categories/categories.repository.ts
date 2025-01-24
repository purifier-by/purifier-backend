import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import CategoryDto from './category.dto';
import { CategoryWithDetails } from './categoryWithDetails.model';

@Injectable()
class CategoriesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    const domain = this.configService.get('DOMAIN');

    const databaseResponse = await this.databaseService.runQuery(
      `SELECT id,
                    title,
                    CONCAT('${domain}/', image) AS "image",
                    (
                        SELECT json_agg(json_build_object(
                          'id', "id",
                          'title', "title",
                           'description', "description",
                          'slug', "slug",
                          'categoryId', "categoryId",
                          'image', CONCAT('${domain}/', sub_categories.image)
                      ))
                        FROM sub_categories
                        WHERE sub_categories."categoryId" = categories.id
                    ) as "subCategories",
                    (
                        SELECT COUNT(*)
                        FROM products
                        WHERE products."categoryId" = categories.id
                    ) AS "totalProductsCount",    slug
                                FROM categories
        `,
    );

    return databaseResponse.rows.map(
      (databaseRow) => new CategoryWithDetails(databaseRow),
    );
  }

  async getBySlug(slug: string) {
    const domain = this.configService.get('DOMAIN');

    const categoryResponse = await this.databaseService.runQuery(
      `SELECT id, 
          title,
          slug,
          CONCAT('${domain}/', image) as "image",
          (SELECT json_agg(json_build_object(
            'id', "id",
            'title', "title",
            'slug', "slug",
            'description', "description",
            'categoryId', "categoryId",
            'image', CONCAT('${domain}/', sub_categories.image)
        ))
                FROM sub_categories
                WHERE  sub_categories."categoryId" = categories.id) as "subCategories"
          FROM categories
          WHERE categories.slug=$1
          `,
      [slug],
    );
    const categoryEntity = categoryResponse.rows[0];

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    return new CategoryWithDetails({ ...categoryEntity });
  }

  async getById(id: number) {
    const domain = this.configService.get('DOMAIN');

    const categoryResponse = await this.databaseService.runQuery(
      `SELECT id, 
          title,
          slug,
          CONCAT('${domain}/', image) as "image",
          (SELECT json_agg(json_build_object(
            'id', "id",
            'title', "title",
            'description', "description",
            'slug', "slug",
            'categoryId', "categoryId",
            'image', CONCAT('${domain}/', sub_categories.image)
        ))
                FROM sub_categories
                WHERE  sub_categories."categoryId" = categories.id) as "subCategories"
          FROM categories
          WHERE categories.id=$1
          `,
      [id],
    );
    const categoryEntity = categoryResponse.rows[0];

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    return new CategoryWithDetails({ ...categoryEntity });
  }

  async create(categoryData: CategoryDto) {
    const client = await this.databaseService.getPoolClient();
    try {
      await client.query('BEGIN;');
      const categoryResponse = await client.query(
        `
              INSERT INTO categories (
                title,
                slug,
                image
              ) VALUES (
                $1,
                $2,
                $3
              ) RETURNING *
            `,
        [categoryData.title, categoryData.slug, categoryData.image],
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

  async update(id: number, categoryData: CategoryDto) {
    const client = await this.databaseService.getPoolClient();

    try {
      await client.query('BEGIN;');

      const categoryResponse = await client.query(
        `
            UPDATE categories
            SET title = $2, image = $3
            WHERE id = $1
            RETURNING *
        `,
        [id, categoryData.title, categoryData.slug, categoryData.image],
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
      await client.query(
        `UPDATE sub_categories set "categoryId" = NULL where "categoryId" = $1 RETURNING *`,
        [id],
      );

      const databaseResponse = await client.query(
        `DELETE FROM categories WHERE id=$1`,
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

export default CategoriesRepository;
