import { Exclude } from 'class-transformer';

type UserModelData = {
    id: number;
    login: string;
    password: string;
};
class UserModel {
    id: number;
    login: string;
    @Exclude()
    password: string;

    constructor(data: UserModelData) {
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
    }
}

export default UserModel;
