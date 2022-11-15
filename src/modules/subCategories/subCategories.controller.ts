import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import FindOneParams from "src/utils/findOneParams";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { SubCategoryDto } from "./subCategory.dto";
import { SubCategoriesService } from "./subCategories.service";


@ApiTags('Subcategories')
@Controller('subcategories')
@UseInterceptors(ClassSerializerInterceptor)
export class SubCategoriesController {
    constructor(private readonly subCategoriesService: SubCategoriesService) { }

    @Get()
    getCategories() {
        return this.subCategoriesService.getCategories();
    }

    @Get(':id')
    getCategoryById(@Param() { id }: FindOneParams) {
        return this.subCategoriesService.getCategoryById(id);
    }

    @Put(':id')
    updateCategory(@Param() { id }: FindOneParams, @Body() categoryData: SubCategoryDto) {
        return this.subCategoriesService.updateCategory(id, categoryData);
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    createCategory(@Body() categoryData: SubCategoryDto) {
        return this.subCategoriesService.createCategory(categoryData);
    }

    @Delete(':id')
    deleteCategory(@Param() { id }: FindOneParams) {
        return this.subCategoriesService.deleteCategory(id);
    }
}