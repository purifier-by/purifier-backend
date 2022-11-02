import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import FindOneParams from "src/utils/findOneParams";
import ProductDto from "./product.dto";
import { ProductsService } from "./products.service";


@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductsController {
    constructor(private readonly productsService: ProductsService) { }


    @Get(':id')
    getPostById(@Param() { id }: FindOneParams) {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    updatePost(@Param() { id }: FindOneParams, @Body() productData: ProductDto) {
        return this.productsService.updatePost(id, productData);
    }

    @Post()
    // @UseGuards(JwtAuthenticationGuard)
    createPost(@Body() productData: ProductDto) {
        return this.productsService.createPost(productData);
    }

    @Delete(':id')
    deletePost(@Param() { id }: FindOneParams) {
        return this.productsService.deletePost(id);
    }
}