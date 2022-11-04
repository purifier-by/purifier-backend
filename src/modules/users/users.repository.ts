import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import UserModel from './user.model';

@Injectable()
class UsersRepository {
    constructor(private readonly databaseService: DatabaseService) { }

    async getByLogin(login: string) {
        const databaseResponse = await this.databaseService.runQuery(
            `
        SELECT *
          FROM users
          WHERE users.login=$1
      `,
            [login],
        );
        const entity = databaseResponse.rows[0];
        if (!entity) {
            throw new NotFoundException();
        }
        return new UserModel(entity);
    }


    async getById(id: number) {
        const databaseResponse = await this.databaseService.runQuery(
            `
        SELECT *
          FROM users
          WHERE users.id=$1
      `,
            [id],
        );
        const entity = databaseResponse.rows[0];
        if (!entity) {
            throw new NotFoundException();
        }
        return new UserModel(entity);
    }
}

export default UsersRepository;
