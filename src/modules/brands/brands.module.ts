import { Module } from '@nestjs/common';
import ProductsRepository from './brands.repository';
import { BrandsService } from './brands.service';
import BrandsController from './brands.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [BrandsController],
    providers: [
        BrandsService,
        ProductsRepository,
    ],
})
export class BrandsModule { }