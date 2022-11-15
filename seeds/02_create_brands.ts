import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("brands").del();

    await knex("brands").insert([
        { title: "Ecomaster" },
        { title: "Ruhens" },
    ]);
};
