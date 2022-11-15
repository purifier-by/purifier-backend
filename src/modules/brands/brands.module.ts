import { Module } from '@nestjs/common';
import BrandsRepository from './brands.repository';
import { BrandsService } from './brands.service';
import BrandsController from './brands.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [BrandsController],
    providers: [
        BrandsService,
        BrandsRepository,
    ],
})
export class BrandsModule { }