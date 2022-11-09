import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import FindOneParams from "src/utils/findOneParams";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import ProductDto from "./product.dto";
import { ProductsService } from "./products.service";


@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get(':id')
    getProductById(@Param() { id }: FindOneParams) {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    updateProduct(@Param() { id }: FindOneParams, @Body() productData: ProductDto) {
        return this.productsService.updateProduct(id, productData);
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    createProduct(@Body() productData: ProductDto) {
        return this.productsService.createProduct(productData);
    }

    @Delete(':id')
    deleteProduct(@Param() { id }: FindOneParams) {
        return this.productsService.deleteProduct(id);
    }
}