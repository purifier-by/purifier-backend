import { Injectable } from "@nestjs/common";
import ProductDto from "./product.dto";
import ProductsRepository from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) { }

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