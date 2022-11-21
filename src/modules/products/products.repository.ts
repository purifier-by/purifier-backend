
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolClient } from 'pg';
import DatabaseService from '../../database/database.service';
import { ProductDto } from './dto/product.dto';
import ProductWithDetails from './productWithDetails.model';

@Injectable()
class ProductsRepository {
    constructor(private readonly databaseService: DatabaseService, private readonly configService: ConfigService,) { }

    async get(
        categoryId: number,
        subCategoryIds: number[],
        priceMin: number | null,
        priceMax: number | null,
        orderBy: string,
        sort: string,
        next: number | null = 1
    ) {
        const limit = 2;
        const page = ((next - 1) * limit);

        // const client = await this.databaseService.getPoolClient();
        const domain = this.configService.get('DOMAIN');

        let whereSql = [];

        if (priceMin & priceMax) {
            whereSql.push(`price BETWEEN ${priceMin} AND ${priceMax}`)
        } else if (priceMin) {
            whereSql.push(`price >= ${priceMin}`)
        } else if (priceMax) {
            whereSql.push(`price <= ${priceMax}`)
        };

        if (categoryId) {
            whereSql.push(`"categoryId" = ${categoryId}`)
        };

        if (subCategoryIds) {
            whereSql.push(`"subCategoryId" IN (${subCategoryIds.join(',')})`)
        };

        let whereSqlQuery = ``

        if (whereSql.length > 0) {
            whereSqlQuery = 'WHERE ' + whereSql.join(' AND ')
        };

        const sqlQuery = `--sql 
        WITH selected_products
        AS (
            SELECT *
                ,(
                    SELECT json_build_object('id', brand.id, 'title', brand.title)
                    FROM (
                        SELECT *
                        FROM brands
                        WHERE brands.id = products."brandId"
                        ) brand
                    ) AS "brand"
                ,(
                    SELECT json_build_object('id', category.id, 'title', category.title, 'image', CONCAT('${domain}/', category.image))
                    FROM (
                        SELECT *
                        FROM categories
                        WHERE categories.id = products."categoryId"
                        ) category
                    ) AS "category"
                , (
                    SELECT json_build_object('id', "subCategory".id, 'title', "subCategory".title, 'image', CONCAT('${domain}/', "subCategory".image))
                    FROM (
                        SELECT *
                        FROM sub_categories
                        WHERE sub_categories.id = products."subCategoryId"
                        ) "subCategory"
                    ) AS "subCategory"
                , (
                    SELECT ARRAY
                    (
                        SELECT CONCAT('${domain}/', url) AS "url"
                        FROM product_images
                        WHERE product_images."productId" = products.id
                        ORDER BY position
                        )
                    ) AS images   
            FROM products
            ${whereSqlQuery}
            ORDER BY ${orderBy} ${sort}
            OFFSET ${page} ROWS
            FETCH NEXT ${limit} ROWS ONLY 
            ),
            total_products_count_response 
            AS (
                SELECT COUNT(*)::INT AS total_products_count
                FROM products
                ${whereSqlQuery}
            )
        SELECT *
        FROM selected_products, total_products_count_response;
        `

        // console.log(sqlQuery)

        const databaseResponse = await this.databaseService.runQuery(sqlQuery);

        const items = databaseResponse.rows.map(
            (databaseRow) => new ProductWithDetails({ ...databaseRow })
        );
        const count = databaseResponse.rows[0]?.total_products_count || 0;

        const hasNextPage = (count - (page + limit)) > 0

        return {
            items,
            "totalCount": count,
            "next": hasNextPage ? next + 1 : null
        };
    }

    async getWithDetails(productId: number) {
        const client = await this.databaseService.getPoolClient();
        const domain = this.configService.get('DOMAIN')

        const productResponse = await client.query(
            `SELECT *
            , (
                SELECT json_build_object('id', brand.id, 'title', brand.title)
                FROM(
                    SELECT *
                    FROM brands
                    WHERE brands.id = products."brandId"
                ) brand
        ) AS "brand"
            , (
                SELECT json_build_object('id', category.id, 'title', category.title, 'image', CONCAT('${domain}/', category.image))
        FROM(
            SELECT *
            FROM categories
                    WHERE categories.id = products."categoryId"
        ) category
                ) AS "category"
            , (
                SELECT json_build_object('id', "subCategory".id, 'title', "subCategory".title, 'image', CONCAT('${domain}/', "subCategory".image))
        FROM(
            SELECT *
            FROM sub_categories
                    WHERE sub_categories.id = products."subCategoryId"
        ) "subCategory"
                ) AS "subCategory"
            , (
                SELECT ARRAY
                    (
                        SELECT CONCAT('${domain}/', url) AS "url"
                    FROM product_images
                    WHERE product_images."productId" = products.id
                    ORDER BY position
                    )
                ) AS images 
                FROM products
            WHERE products.id = $1`,
            [productId],
        );
        const productEntity = productResponse.rows[0];

        if (!productEntity) {
            throw new NotFoundException();
        }

        return new ProductWithDetails({ ...productEntity });
    }

    async create(productData: ProductDto) {
        const client = await this.databaseService.getPoolClient();
        try {
            await client.query('BEGIN;');

            // TODO: Do validation if brandId, categoryId, subCategoryId  does no exist

            const productResponse = await client.query(
                `INSERT INTO products(title, description, characteristics, points, price, "brandId", "categoryId", "subCategoryId") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * `,
                [productData.title, productData.description, productData.characteristics, productData.points, productData.price, productData.brandId, productData.categoryId, productData.subCategoryId],
            );

            const productEntity = productResponse.rows[0];

            await this.addImagesToProduct(client, productEntity.id, productData.images)

            await client.query(`COMMIT; `);
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
          DELETE FROM product_images WHERE "productId" = $1
            `,
            [productId],
        );
    }

    private async addImagesToProduct(
        client: PoolClient,
        productId: number,
        images: string[] | null
    ) {
        if (!images || images.length < 1) {
            return;
        }

        let position = 1
        for (const image of images) {
            await client.query(`INSERT INTO product_images(url, position, "productId") VALUES($1, $2, $3) RETURNING * `, [image, position, productId]);
            position++
        }

    }

    private async getImageUrlsRelatedToProduct(
        client: PoolClient,
        productId: number,
    ): Promise<number[]> {
        const domain = this.configService.get('DOMAIN')

        const imagesUrlResponse = await client.query(
            `SELECT ARRAY
            (SELECT CONCAT('${domain}/', url) AS "url"
                FROM product_images
                WHERE "productId" = $1
                ORDER BY  position) AS images
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

            // TODO: Do validation if brandId, categoryId, subCategoryId  does no exist

            const productResponse = await client.query(
                `UPDATE 
                        products SET title = $2,
            description = $3,
            characteristics = $4,
            points = $5,
            price = $6,
            "brandId" = $7,
            "categoryId" = $8,
            "subCategoryId" = $9
                WHERE id = $1 RETURNING * `,
                [id, productData.title, productData.description, productData.characteristics, productData.points, productData.price, productData.brandId, productData.categoryId, productData.subCategoryId],
            );
            const productEntity = productResponse.rows[0];
            if (!productEntity) {
                throw new NotFoundException();
            }

            await this.updateImages(client, id, productData.images)

            await client.query(`COMMIT; `);
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
            `DELETE FROM products WHERE id = $1`,
            [id],
        );

        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException();
        }
    }
}

export default ProductsRepository;