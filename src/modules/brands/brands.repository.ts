
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseService from '../../database/database.service';
import BrandDto from './brand.dto';
import BrandModel from './brand.model';

@Injectable()
class BrandsRepository {
    constructor(private readonly databaseService: DatabaseService, private readonly configService: ConfigService,) { }

    async getAll() {
        const databaseResponse = await this.databaseService.runQuery(`
        SELECT * FROM brands
    `);
        return databaseResponse.rows.map(
            (databaseRow) => new BrandModel(databaseRow),
        );
    }

    async getById(id: number) {
        const client = await this.databaseService.getPoolClient();
        const brandResponse = await client.query(
            `
          SELECT
           *
          FROM brands
          WHERE brands.id=$1
          `,
            [id],
        );
        const brandEntity = brandResponse.rows[0];

        if (!brandEntity) {
            throw new NotFoundException();
        }

        return new BrandModel({ ...brandEntity });
    }

    async create(brandData: BrandDto) {
        const client = await this.databaseService.getPoolClient();
        try {
            await client.query('BEGIN;');
            const brandResponse = await client.query(
                `
              INSERT INTO brands (
                title
              ) VALUES (
                $1
              ) RETURNING *
            `,
                [brandData.title],
            );

            const brandEntity = brandResponse.rows[0];

            await client.query(`COMMIT;`);
            return new BrandModel({ ...brandEntity });
        } catch (error) {
            await client.query('ROLLBACK;');
            throw error;
        } finally {
            client.release();
        }
    }

    async update(id: number, brandData: BrandDto) {
        const client = await this.databaseService.getPoolClient();

        try {
            await client.query('BEGIN;');

            const brandResponse = await client.query(
                `
            UPDATE brands
            SET title = $2
            WHERE id = $1
            RETURNING *
        `,
                [id, brandData.title],
            );
            const brandEntity = brandResponse.rows[0];
            if (!brandEntity) {
                throw new NotFoundException();
            }

            return new BrandModel({ ...brandEntity });
        } catch (error) {
            await client.query('ROLLBACK;');
            throw error;
        } finally {
            client.release();
        }
    }


    async delete(id: number) {
        const client = await this.databaseService.getPoolClient();

        await client.query(`UPDATE products set brandId = NULL where brandId = $1 RETURNING *`, [id])

        const databaseResponse = await client.query(
            `DELETE FROM brands WHERE id=$1`,
            [id],
        );

        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException();
        }
    }
}

export default BrandsRepository;