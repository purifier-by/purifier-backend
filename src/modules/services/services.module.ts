import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServicesService } from './services.service';
import { ServicesRepository } from './services.repository';
import ServicesController from './services.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
