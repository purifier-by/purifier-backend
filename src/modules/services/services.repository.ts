import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import { ServicesModel } from './services.model';
import ServicesDto from '../services/services.dto';

@Injectable()
export class ServicesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  // Получить все услуги
  async getAll() {
    const domain = this.configService.get('DOMAIN');

    const databaseResponse = await this.databaseService.runQuery(`
      SELECT id, title, description, price FROM services
    `);

    return databaseResponse.rows.map(
      (databaseRow) => new ServicesModel(databaseRow),
    );
  }

  // Получить услугу по ID
  async getById(id: number) {
    const domain = this.configService.get('DOMAIN');

    const serviceResponse = await this.databaseService.runQuery(
      `
        SELECT id, title, description, price 
        FROM services 
        WHERE id=$1
      `,
      [id],
    );
    const serviceEntity = serviceResponse.rows[0];

    if (!serviceEntity) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return new ServicesModel({ ...serviceEntity });
  }

  // Создать услугу
  async create(serviceData: ServicesDto) {
    const client = await this.databaseService.getPoolClient();
    try {
      await client.query('BEGIN;');
      const serviceResponse = await client.query(
        `
          INSERT INTO services (title, description, price)
          VALUES ($1, $2, $3)
          RETURNING *
        `,
        [serviceData.title, serviceData.description, serviceData.price],
      );

      const serviceEntity = serviceResponse.rows[0];

      await client.query('COMMIT;');
      return this.getById(serviceEntity.id);
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }

  // Обновить услугу
  async update(id: number, serviceData: ServicesDto) {
    const client = await this.databaseService.getPoolClient();

    try {
      await client.query('BEGIN;');

      const serviceResponse = await client.query(
        `
          UPDATE services
          SET title = $2, description = $3, price = $4
          WHERE id = $1
          RETURNING *
        `,
        [id, serviceData.title, serviceData.description, serviceData.price],
      );
      const serviceEntity = serviceResponse.rows[0];

      if (!serviceEntity) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      await client.query('COMMIT;');
      return this.getById(id);
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }

  // Удалить услугу
  async delete(id: number) {
    const client = await this.databaseService.getPoolClient();

    try {
      const databaseResponse = await client.query(
        `DELETE FROM services WHERE id=$1 RETURNING *`,
        [id],
      );

      if (databaseResponse.rowCount === 0) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      await client.query('COMMIT;');
    } catch (error) {
      await client.query('ROLLBACK;');
      throw error;
    } finally {
      client.release();
    }
  }
}
