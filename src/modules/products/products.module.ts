import { Module } from '@nestjs/common';
import ProductsRepository from './products.repository';
import { ProductsService } from './products.service';
import ProductsController from './products.controller';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
    ],
})
export class ProductsModule { }