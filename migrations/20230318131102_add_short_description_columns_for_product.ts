import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE products ADD COLUMN "short_description" text`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`ALTER TABLE products ADD COLUMN "short_description" text`);
}
