import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('services', (table) => {
    table.increments('id').primary(); // Автоматически увеличиваемый id
    table.string('title').notNullable(); // Название услуги
    table.text('description').notNullable(); // Описание услуги
    table.string('price').notNullable(); // Цена услуги
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('services'); // Удаление таблицы
}
