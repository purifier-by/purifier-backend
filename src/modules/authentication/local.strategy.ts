import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import UserModel from '../users/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'login',
    });
  }
  async validate(login: string, password: string): Promise<UserModel> {
    return this.authenticationService.getAuthenticatedUser(login, password);
  }
}
