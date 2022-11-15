import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("sub_categories").del();

    await knex("sub_categories").insert([
        { title: "Напольные пурифайеры", image: "1.png", categoryId: 1 },
        { title: "Настольные пурифайеры", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с ультрафиолетом", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с кислородом", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с охлаждением", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с обратным осмосом", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с ультрафильтрацией", image: "1.png", categoryId: 1 },
        { title: "Пурифайеры с газацией", image: "1.png", categoryId: 1 },

        { title: "Фильтры для воды", image: "1.png", categoryId: 2 },
        { title: "Фильтры для пурифайеров", image: "1.png", categoryId: 2 },
        { title: "Бытовые фильтры", image: "1.png", categoryId: 2 },

        { title: "Краны для HoReCa", image: "1.png", categoryId: 3 },
        { title: "Питьевые фонтанчики", image: "1.png", categoryId: 3 },
        { title: "Запчасти для пурифайеров", image: "1.png", categoryId: 3 },
    ]);
};
