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
import { SubCategoryDto } from './subCategory.dto';
import { SubCategoriesService } from './subCategories.service';

@ApiTags('Subcategories')
@Controller('subcategories')
@UseInterceptors(ClassSerializerInterceptor)
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Get()
  getSubCategories() {
    return this.subCategoriesService.getCategories();
  }

  @Get('id/:id')
  getSubCategoryById(@Param('id') id: number) {
    return this.subCategoriesService.getCategoryById(id);
  }

  @Get('slug/:slug')
  getSubCategoryBySlug(@Param('slug') slug: string) {
    return this.subCategoriesService.getCategoryBySlug(slug);
  }

  @Put(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  updateSubCategory(
    @Param() { id }: FindOneParams,
    @Body() categoryData: SubCategoryDto,
  ) {
    return this.subCategoriesService.updateCategory(id, categoryData);
  }

  @Post()
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  createSubCategory(@Body() categoryData: SubCategoryDto) {
    return this.subCategoriesService.createCategory(categoryData);
  }

  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  deleteSubCategory(@Param() { id }: FindOneParams) {
    return this.subCategoriesService.deleteCategory(id);
  }
}
