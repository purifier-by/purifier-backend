import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import FindOneParams from "src/utils/findOneParams";
import PaginationParams from "src/utils/paginationParams";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { GetProductsByCategoryQuery } from "./getProductsByCategoryQuery";
import { ProductDto } from "./product.dto";
import { ProductsService } from "./products.service";
import { SearchProductsQuery } from "./searchProductsQuery";


@ApiTags('Products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getProducts(
        @Query() { categoryId }: GetProductsByCategoryQuery,
        @Query() { search }: SearchProductsQuery,
        @Query() { offset, limit, idsToSkip }: PaginationParams,
    ) {
        return this.productsService.getProducts(
            categoryId,
            offset,
            limit,
            idsToSkip,
            search,
        );
    }

    @Get(':id')
    getProductById(@Param() { id }: FindOneParams) {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthenticationGuard)
    updateProduct(@Param() { id }: FindOneParams, @Body() productData: ProductDto) {
        return this.productsService.updateProduct(id, productData);
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    createProduct(@Body() productData: ProductDto) {
        return this.productsService.createProduct(productData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthenticationGuard)
    deleteProduct(@Param() { id }: FindOneParams) {
        return this.productsService.deleteProduct(id);
    }
}