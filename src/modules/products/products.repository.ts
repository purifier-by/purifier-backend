
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
          *,
          (
            SELECT
                json_build_object(
                    'id',
                    brand.id,
                    'title',
                    brand.title
                )
            FROM (
                    SELECT *
                    FROM brands
                    WHERE
                        brands.id = products.brandId
                ) brand
        ) AS "brand"
          FROM products
          WHERE id=$1
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

            // TODO: Do validation if brandId does no exist

            const productResponse = await client.query(
                `
              INSERT INTO products (
                title,
                description,
                characteristics,
                points,
                price,
                brandId
              ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
              ) RETURNING *
            `,
                [productData.title, productData.description, productData.characteristics, productData.points, productData.price, productData.brandId],
            );

            const productEntity = productResponse.rows[0];

            await this.addImagesToProduct(client, productEntity.id, productData.images)

            await client.query(`COMMIT;`);
            return this.getWithDetails(productEntity.id);
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
          DELETE FROM product_images WHERE productId = $1
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
            await client.query(`INSERT INTO product_images (url, position, productId) VALUES ($1, $2, $3) RETURNING *`, [image, position, productId]);
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
                    productId = $1
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

            // TODO: Do validation if brandId does no exist

            const productResponse = await client.query(
                `
            UPDATE products
            SET title = $2, description = $3, characteristics = $4, points = $5, price = $6, brandId = $7
            WHERE id = $1
            RETURNING *
        `,
                [id, productData.title, productData.description, productData.characteristics, productData.points, productData.price, productData.brandId],
            );
            const productEntity = productResponse.rows[0];
            if (!productEntity) {
                throw new NotFoundException();
            }

            await this.updateImages(client, id, productData.images)

            await client.query(`COMMIT;`);
            return this.getWithDetails(productEntity.id);
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