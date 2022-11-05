import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import UsersService from '../users/users.service';
import TokenPayload from './tokenPayload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        readonly userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: TokenPayload) {
        return this.userService.getById(payload.userId);
    }
}