import { Module } from '@nestjs/common';
import CategoriesRepository from './categories.repository';
import { CategoriesService } from './categories.service';
import CategoriesController from './categories.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        CategoriesRepository,
    ],
})
export class CategoriesModule { }