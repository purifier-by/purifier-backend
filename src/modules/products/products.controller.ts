import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import FindOneParams from 'src/utils/findOneParams';
import { OrderParams } from 'src/utils/orderParams';
import { JwtAuthGuard } from '../authentication/jwt-authentication.guard';
import { GetProductsByCategoryQuery } from './dto/getProductsByCategoryQuery';
import { GetProductsByPriceQuery } from './dto/getProductsByPriceQuery';
import { ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
import { SearchProductsQuery } from './dto/searchProductsQuery';
import { LoadMorePagination } from './dto/loadMorePaginationQuery';
import { string } from 'joi';

@ApiTags('Products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'subCategorySlugs',
    required: false,
    type: 'string',
    example: 'slug1,slug2,slug3',
    explode: false,
  })
  getProducts(
    @Query() { categoryId }: GetProductsByCategoryQuery,
    @Query(
      'subCategorySlugs',
      new ParseArrayPipe({
        items: String,
        separator: ',',
        optional: true,
      }),
    )
    subCategorySlugs: string[],
    @Query() { priceMin, priceMax }: GetProductsByPriceQuery,
    @Query() { search }: SearchProductsQuery,
    @Query() { next }: LoadMorePagination,
    @Query() { orderBy, sort }: OrderParams,
  ) {
    return this.productsService.getProducts(
      categoryId,
      subCategorySlugs,
      priceMin,
      priceMax,
      orderBy,
      sort,
      next,
      search,
    );
  }
  @Get('id/:id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Get('slug/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.productsService.getProductBySlug(slug);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateProduct(@Param('id') id: number, @Body() productData: ProductDto) {
    return this.productsService.updateProduct(id, productData);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() productData: ProductDto) {
    return this.productsService.createProduct(productData);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteSubCategory(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
