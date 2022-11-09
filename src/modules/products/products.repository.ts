
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import ProductDto from './product.dto';
import ProductModel from './product.model';
import ProductWithDetails from './productWithDetails.model';

@Injectable()
class ProductsRepository {
    constructor(private readonly databaseService: DatabaseService, private readonly configService: ConfigService,) { }

    async getAll() {
        const databaseResponse = await this.databaseService.runQuery(`
        SELECT * FROM products
    `);
        const items = databaseResponse.rows.map(
            (databaseRow) => new ProductModel(databaseRow),
        );
        return { items }
    }

    async getWithDetails(productId: number) {
        const productResponse = await this.databaseService.runQuery(
            `
          SELECT
           *
          FROM products
          WHERE products.id=$1
          `,
            [productId],
        );
        const productEntity = productResponse.rows[0];

        if (!productEntity) {
            throw new NotFoundException();
        }

        const domain = this.configService.get('DOMAIN')

        const imagesUrlResponse = await this.databaseService.runQuery(
            `
            SELECT ARRAY(
                SELECT CONCAT('${domain}/', url) AS "url"
                FROM product_images
                WHERE
                    product_id = $1
                ORDER BY position
            ) AS images
          `,
            [productId],
        );

        return new ProductWithDetails({ ...productEntity, images: imagesUrlResponse.rows[0].images });
    }

    async create(productData: ProductDto) {
        const productResponse = await this.databaseService.runQuery(
            `
          INSERT INTO products (
            title,
            description,
            characteristics,
            points,
            price
          ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
          ) RETURNING *
        `,
            [productData.title, productData.description, productData.characteristics, productData.points, productData.price],
        );

        const productEntity = productResponse.rows[0];

        if (productData.images) {
            let position = 1
            for (const image of productData.images) {
                await this.databaseService.runQuery(`INSERT INTO product_images (url, position, product_id) VALUES ($1, $2, $3) RETURNING *`, [image, position, productEntity.id]);
                position++
            }
        }

        return new ProductModel(productEntity);
    }

    async update(id: number, productData: ProductDto) {
        const client = await this.databaseService.getPoolClient();

        try {
            await client.query('BEGIN;');

            const databaseResponse = await client.query(
                `
            UPDATE posts
            SET title = $2, description = $3, characteristics = $4, points = $5, price = $6
            WHERE id = $1
            RETURNING *
        `,
                [id, productData.title, productData.description, productData.characteristics, productData.points, productData.price],
            );
            const entity = databaseResponse.rows[0];
            if (!entity) {
                throw new NotFoundException();
            }

            return new ProductModel(entity);
        } catch (error) {
            await client.query('ROLLBACK;');
            throw error;
        } finally {
            client.release();
        }
    }


    async delete(id: number) {
        const databaseResponse = await this.databaseService.runQuery(
            `DELETE FROM products WHERE id=$1`,
            [id],
        );
        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException();
        }
    }
}

export default ProductsRepository;