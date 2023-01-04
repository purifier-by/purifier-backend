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
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CategoryDto from './category.dto';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCategoryById(id);
  }

  @Put(':id')
  @ApiBearerAuth('defaultBearerAuth')
  updateCategory(
    @Param() { id }: FindOneParams,
    @Body() categoryData: CategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @Post()
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthenticationGuard)
  createCategory(@Body() categoryData: CategoryDto) {
    return this.categoriesService.createCategory(categoryData);
  }

  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(id);
  }
}
