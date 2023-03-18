import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import ProductsRepository from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getProducts(
    categoryId?: number,
    subCategoryIds?: number[],
    priceMin?: number,
    priceMax?: number,
    sort?: string,
    orderBy?: string,
    next?: number | null,
    searchQuery?: string,
  ) {
    return this.productsRepository.get(
      categoryId,
      subCategoryIds,
      priceMin,
      priceMax,
      sort,
      orderBy,
      next,
    );
  }

  getProductById(id: number) {
    return this.productsRepository.getWithDetails(id);
  }

  createProduct(productData: ProductDto) {
    return this.productsRepository.create(productData);
  }

  updateProduct(id: number, productData: ProductDto) {
    return this.productsRepository.update(id, productData);
  }

  deleteProduct(id: number) {
    return this.productsRepository.delete(id);
  }
}
