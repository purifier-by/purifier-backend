import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        {
            title: 'Product 1',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 200,
            brandId: 1,
            categoryId: 1,
            subCategoryId: 1,
        },
        {
            title: 'Product 2',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 600,
            brandId: 1,
            categoryId: 1,
            subCategoryId: 2,
        },
        {
            title: 'Product 3',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 600,
            brandId: 1,
            categoryId: 2,
            subCategoryId: 1,
        },
        {
            title: 'Product 4',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 800,
            brandId: 1,
            categoryId: 2,
            subCategoryId: 2,
        },
        {
            title: 'Product 5',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 600,
            brandId: 1,
            categoryId: 3,
            subCategoryId: 1,
        },
        {
            title: 'Product 6',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 900,
            brandId: 1,
            categoryId: 3,
            subCategoryId: 2,
        },
    ]);

    await knex("product_images").insert([
        {
            position: 1,
            url: '1.png',
            productId: 1,
        },
        {
            position: 2,
            url: '1.png',
            productId: 1,
        },
        {
            position: 3,
            url: '1.png',
            productId: 1,
        },
        {
            position: 1,
            url: '1.png',
            productId: 2,
        },
        {
            position: 2,
            url: '1.png',
            productId: 2,
        },
        {
            position: 3,
            url: '1.png',
            productId: 2,
        },
        {
            position: 1,
            url: '1.png',
            productId: 3,
        },
        {
            position: 2,
            url: '1.png',
            productId: 3,
        },
        {
            position: 3,
            url: '1.png',
            productId: 3,
        },
        {
            position: 1,
            url: '1.png',
            productId: 4,
        },
        {
            position: 2,
            url: '1.png',
            productId: 4,
        },
        {
            position: 3,
            url: '1.png',
            productId: 4,
        },
        {
            position: 1,
            url: '1.png',
            productId: 5,
        },
        {
            position: 2,
            url: '1.png',
            productId: 5,
        },
        {
            position: 3,
            url: '1.png',
            productId: 5,
        },
        {
            position: 1,
            url: '1.png',
            productId: 6,
        },
        {
            position: 2,
            url: '1.png',
            productId: 6,
        },
        {
            position: 3,
            url: '1.png',
            productId: 6,
        }
    ])
};
