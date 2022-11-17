import { Injectable } from "@nestjs/common";
import { ProductDto } from "./product.dto";
import ProductsRepository from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) { }

    getProducts(
        categoryId?: number,
        offset?: number,
        limit?: number,
        idsToSkip?: number,
        searchQuery?: string,
    ) {

        // if (categoryId && searchQuery) {
        //     return this.postsSearchRepository.searchByAuthor(
        //         authorId,
        //         offset,
        //         limit,
        //         idsToSkip,
        //         searchQuery,
        //     );
        // }

        if (categoryId) {
            return this.productsRepository.get(
                categoryId,
                offset,
                limit,
            );
        }

        // if (searchQuery) {
        //     return this.postsSearchRepository.search(
        //         offset,
        //         limit,
        //         idsToSkip,
        //         searchQuery,
        //     );
        // }
        return this.productsRepository.get(categoryId, offset, limit);
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