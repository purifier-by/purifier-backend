import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import FindOneParams from 'src/utils/findOneParams';
import { JwtAuthGuard } from '../authentication/jwt-authentication.guard';
import ServicesDto from './services.dto';
import { ServicesService } from './services.service';

@ApiTags('Services')
@Controller('services')
@UseInterceptors(ClassSerializerInterceptor)
export default class ServicesController {
  constructor(private readonly ServicesService: ServicesService) {}

  @Get()
  getCategories() {
    return this.ServicesService.getServices();
  }

  @Get(':id')
  getServicesById(@Param() { id }: FindOneParams) {
    return this.ServicesService.getServicesById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  updateServices(
    @Param() { id }: FindOneParams,
    @Body() servicesData: ServicesDto,
  ) {
    return this.ServicesService.updateServices(id, servicesData);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createCServices(@Body() servicesData: ServicesDto) {
    return this.ServicesService.createServices(servicesData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteCServices(@Param() { id }: FindOneParams) {
    return this.ServicesService.deleteServices(id);
  }
}
