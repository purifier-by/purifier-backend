import { Module } from '@nestjs/common';
import ProductsRepository from './products.repository';
import { ProductsService } from './products.service';
import ProductsController from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [ConfigModule, AuthenticationModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
