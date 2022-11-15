
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import CategoryDto from './category.dto';
import CategoryModel from './category.model';

@Injectable()
class CategoriesRepository {
    constructor(private readonly databaseService: DatabaseService, private readonly configService: ConfigService,) { }

    async getAll() {
        const domain = this.configService.get('DOMAIN')

        const databaseResponse = await this.databaseService.runQuery(`
        SELECT id, title, CONCAT('${domain}/', image) AS "image" FROM categories
    `);
        return databaseResponse.rows.map(
            (databaseRow) => new CategoryModel(databaseRow),
        );
    }

    async getById(id: number) {
        const domain = this.configService.get('DOMAIN')

        const categoryResponse = await this.databaseService.runQuery(
            `
          SELECT
          id, 
          title,
          CONCAT('${domain}/', image) as "image"
          FROM categories
          WHERE categories.id=$1
          `,
            [id],
        );
        const categoryEntity = categoryResponse.rows[0];

        if (!categoryEntity) {
            throw new NotFoundException();
        }

        return new CategoryModel({ ...categoryEntity });
    }

    async create(categoryData: CategoryDto) {
        const client = await this.databaseService.getPoolClient();
        try {
            await client.query('BEGIN;');
            const categoryResponse = await client.query(
                `
              INSERT INTO categories (
                title,
                image
              ) VALUES (
                $1,
                $2
              ) RETURNING *
            `,
                [categoryData.title, categoryData.image],
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
                [id, categoryData.title, categoryData.image],
            );
            const categoryEntity = categoryResponse.rows[0];
            if (!categoryEntity) {
                throw new NotFoundException();
            }

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

        await client.query(`UPDATE products set categoryId = NULL where categoryId = $1 RETURNING *`, [id])

        // ToDo: set Null subcategory and category for product
        const databaseResponse = await client.query(
            `DELETE FROM categories WHERE id=$1`,
            [id],
        );

        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException();
        }
    }
}

export default CategoriesRepository;