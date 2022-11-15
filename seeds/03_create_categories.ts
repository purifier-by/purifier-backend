import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("categories").del();

    await knex("categories").insert([
        { title: "Пурифайеры", image: "1.png" },
        { title: "Фильтры", image: "1.png" },
        { title: "Другое", image: "1.png" }
    ]);
};
