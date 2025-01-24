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

  @Get('id/:id')
  getCategoryById(@Param('id') id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get('slug/:slug')
  getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getCategoryBySlug(slug);
  }

  @Put(':id')
  @ApiBearerAuth()
  updateCategory(
    @Param() { id }: FindOneParams,
    @Body() categoryData: CategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() categoryData: CategoryDto) {
    return this.categoriesService.createCategory(categoryData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  deleteCategory(@Param() { id }: FindOneParams) {
    return this.categoriesService.deleteCategory(id);
  }
}
