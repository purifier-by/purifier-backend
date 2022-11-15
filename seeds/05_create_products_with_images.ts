import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        {
            title: 'Title 1',
            description: 'description',
            characteristics: 'characteristics',
            points: 'points',
            price: 500,
            brandId: 1,
            categoryId: 1,
            subCategoryId: 1,
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
        }])
};
