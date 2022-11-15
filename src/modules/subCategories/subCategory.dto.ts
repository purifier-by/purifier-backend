import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SubCategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}