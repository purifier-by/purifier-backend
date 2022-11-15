import { Module } from '@nestjs/common';
import { SubCategoriesRepository } from './subCategories.repository';
import { SubCategoriesService } from './subCategories.service';
import { SubCategoriesController } from './subCategories.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [SubCategoriesController],
    providers: [
        SubCategoriesService,
        SubCategoriesRepository,
    ],
})
export class SubCategoriesModule { }