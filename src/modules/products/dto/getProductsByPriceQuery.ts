import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class GetProductsByPriceQuery {

    @ApiProperty({ required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => Number(value))
    priceMin?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    @Transform(({ value }) => Number(value))
    priceMax?: number;
}
