import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
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
    getSubCategories() {
        return this.subCategoriesService.getCategories();
    }

    @Get(':id')
    getSubCategoryById(@Param() { id }: FindOneParams) {
        return this.subCategoriesService.getCategoryById(id);
    }

    @Put(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    updateSubCategory(@Param() { id }: FindOneParams, @Body() categoryData: SubCategoryDto) {
        return this.subCategoriesService.updateCategory(id, categoryData);
    }

    @Post()
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    createSubCategory(@Body() categoryData: SubCategoryDto) {
        return this.subCategoriesService.createCategory(categoryData);
    }

    @Delete(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    deleteSubCategory(@Param() { id }: FindOneParams) {
        return this.subCategoriesService.deleteCategory(id);
    }
}