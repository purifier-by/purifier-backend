import { IsString, IsNotEmpty } from 'class-validator';

export class SearchProductsQuery {
    @IsString()
    @IsNotEmpty()
    search?: string;
}