import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { substringDomain } from 'src/utils/substringDomain';

class ServicesDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}

export default ServicesDto;
