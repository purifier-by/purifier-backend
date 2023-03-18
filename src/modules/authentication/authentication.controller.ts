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
import { JwtAuthGuard } from './jwt-authentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async logIn(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;
    const jwt = this.authenticationService.getJwtToken(user.id, user.login);

    return { token: jwt, ...user };
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('logout')
  // async logOut(@Res() response: Response) {
  //     response.setHeader(
  //         'Set-Cookie',
  //         this.authenticationService.getCookieForLogOut(),
  //     );
  //     return response.sendStatus(200);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
