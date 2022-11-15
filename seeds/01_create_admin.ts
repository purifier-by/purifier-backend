import { Knex } from "knex";
import * as bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  const hashedPassword = await bcrypt.hash('iLp240B', 10);
  return knex.raw(
    `
    INSERT INTO users (
      login,
      password
    ) VALUES (
      'admin',
      ?
    )
  `,
    [hashedPassword],
  );
};
