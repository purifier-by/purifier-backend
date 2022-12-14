import { Injectable } from '@nestjs/common';
import UsersRepository from './users.repository';

@Injectable()
class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async getByLogin(login: string) {
        return this.usersRepository.getByLogin(login);
    }

    async getById(id: number) {
        return this.usersRepository.getById(id);
    }
}

export default UsersService;