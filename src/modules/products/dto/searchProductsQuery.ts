import { IsString, IsOptional } from 'class-validator';

export class SearchProductsQuery {
    @IsString()
    @IsOptional()
    search?: string;
}