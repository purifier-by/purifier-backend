import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import FindOneParams from "src/utils/findOneParams";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import BrandDto from "./brand.dto";
import { BrandsService } from "./brands.service";


@ApiTags('Brands')
@Controller('brands')
@UseInterceptors(ClassSerializerInterceptor)
export default class BrandsController {
    constructor(private readonly brandsService: BrandsService) { }

    @Get()
    getBrands() {
        return this.brandsService.getBrands();
    }

    @Get(':id')
    getBrandById(@Param() { id }: FindOneParams) {
        return this.brandsService.getBrandById(id);
    }

    @Put(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    updateBrand(@Param() { id }: FindOneParams, @Body() brandData: BrandDto) {
        return this.brandsService.updateBrand(id, brandData);
    }

    @Post()
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    createBrand(@Body() brandData: BrandDto) {
        return this.brandsService.createBrand(brandData);
    }

    @Delete(':id')
    @ApiCookieAuth()
    @UseGuards(JwtAuthenticationGuard)
    deleteBrand(@Param() { id }: FindOneParams) {
        return this.brandsService.deleteBrand(id);
    }
}