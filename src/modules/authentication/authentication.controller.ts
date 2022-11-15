import {
    Req,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Res,
    Get,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(
        @Req() request: RequestWithUser,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id, user.login);
        response.setHeader('Set-Cookie', cookie);
        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Res() response: Response) {
        response.setHeader(
            'Set-Cookie',
            this.authenticationService.getCookieForLogOut(),
        );
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        return request.user;
    }
}
