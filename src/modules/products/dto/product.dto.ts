import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { substringDomain } from 'src/utils/substringDomain';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  characteristics: string;

  @IsString()
  @IsNotEmpty()
  points: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  brandId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  subCategoryId: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  delivery = 'Доставка в течение 3-5 рабочих дней';

  @IsString()
  @IsOptional()
  payment = 'Оплата при получении или онлайн';

  // @IsString({ each: true })
  // @Type(() => String)
  @IsOptional()
  @Transform(({ value }) => value.map(substringDomain))
  images?: string[];
}
