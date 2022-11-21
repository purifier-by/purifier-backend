import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { substringDomain } from 'src/utils/substringDomain';

export class SubCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @Transform(({ value }) => substringDomain(value))
    image: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}