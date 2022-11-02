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

    createPost(productData: ProductDto) {
        // if (productData.categoryIds?.length) {
        //     return this.productsRepository.createWithCategories(productData);
        // }
        return this.productsRepository.create(productData);
    }

    updatePost(id: number, productData: ProductDto) {
        return this.productsRepository.update(id, productData);
    }

    deletePost(id: number) {
        return this.productsRepository.delete(id);
    }
}