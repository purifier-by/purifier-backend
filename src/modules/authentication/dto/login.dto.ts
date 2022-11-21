import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LoginDto;
