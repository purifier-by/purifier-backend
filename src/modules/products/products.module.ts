import { Module } from '@nestjs/common';
import ProductsRepository from './products.repository';
import { ProductsService } from './products.service';
import ProductsController from './products.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ProductsRepository,
    ],
})
export class ProductsModule { }