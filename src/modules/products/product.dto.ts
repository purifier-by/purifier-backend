import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

class ProductDto {
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
    price: number;
}

export default ProductDto;