import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table
      .text('delivery')
      .defaultTo('Доставка в течение 3-5 рабочих дней')
      .notNullable(); // Поле delivery
    table
      .text('payment')
      .defaultTo('Оплата при получении или онлайн')
      .notNullable(); // Поле payment
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('delivery'); // Удаление поля delivery
    table.dropColumn('payment'); // Удаление поля payment
  });
}
