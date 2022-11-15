
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolClient } from 'pg';
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
        const client = await this.databaseService.getPoolClient();
        const productResponse = await client.query(
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

        const images = await this.getImageUrlsRelatedToProduct(client, productId)

        return new ProductWithDetails({ ...productEntity, images });
    }

    async create(productData: ProductDto) {
        const client = await this.databaseService.getPoolClient();
        try {
            await client.query('BEGIN;');
            const productResponse = await client.query(
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

            await this.addImagesToProduct(client, productEntity.id, productData.images)
            const images = await this.getImageUrlsRelatedToProduct(client, productEntity.id)

            await client.query(`COMMIT;`);
            return new ProductWithDetails({ ...productEntity, images });
        } catch (error) {
            await client.query('ROLLBACK;');
            throw error;
        } finally {
            client.release();
        }
    }


    private async removeImagesFromProduct(
        client: PoolClient,
        productId: number,
    ) {
        return client.query(
            `
          DELETE FROM product_images WHERE product_id = $1
        `,
            [productId],
        );
    }

    private async addImagesToProduct(
        client: PoolClient,
        productId: number,
        images: string[]
    ) {
        if (!images.length) {
            return;
        }

        let position = 1
        for (const image of images) {
            await client.query(`INSERT INTO product_images (url, position, product_id) VALUES ($1, $2, $3) RETURNING *`, [image, position, productId]);
            position++
        }

    }

    private async getImageUrlsRelatedToProduct(
        client: PoolClient,
        productId: number,
    ): Promise<number[]> {
        const domain = this.configService.get('DOMAIN')

        const imagesUrlResponse = await client.query(
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

        return imagesUrlResponse.rows[0].images;
    }

    private async updateImages(
        client: PoolClient,
        productId: number,
        newImages: string[],
    ) {
        await this.removeImagesFromProduct(client, productId)
        await this.addImagesToProduct(client, productId, newImages)
        return await this.getImageUrlsRelatedToProduct(client, productId)
    }

    async update(id: number, productData: ProductDto) {
        const client = await this.databaseService.getPoolClient();

        try {
            await client.query('BEGIN;');

            const productResponse = await client.query(
                `
            UPDATE posts
            SET title = $2, description = $3, characteristics = $4, points = $5, price = $6
            WHERE id = $1
            RETURNING *
        `,
                [id, productData.title, productData.description, productData.characteristics, productData.points, productData.price],
            );
            const productEntity = productResponse.rows[0];
            if (!productEntity) {
                throw new NotFoundException();
            }

            const images = await this.updateImages(client, id, productData.images)

            return new ProductWithDetails({ ...productEntity, images });
        } catch (error) {
            await client.query('ROLLBACK;');
            throw error;
        } finally {
            client.release();
        }
    }


    async delete(id: number) {
        const client = await this.databaseService.getPoolClient();
        await this.removeImagesFromProduct(client, id)
        const databaseResponse = await client.query(
            `DELETE FROM products WHERE id=$1`,
            [id],
        );

        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException();
        }
    }
}

export default ProductsRepository;