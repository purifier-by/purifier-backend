import { Injectable } from "@nestjs/common";
import BrandDto from "./brand.dto";
import BrandsRepository from "./brands.repository";

@Injectable()
export class BrandsService {
    constructor(
        private readonly brandsRepository: BrandsRepository,
    ) { }

    getBrands() {
        return this.brandsRepository.getAll();
    }

    getBrandById(id: number) {
        return this.brandsRepository.getById(id);
    }

    createBrand(productData: BrandDto) {
        return this.brandsRepository.create(productData);
    }

    updateBrand(id: number, productData: BrandDto) {
        return this.brandsRepository.update(id, productData);
    }

    deleteBrand(id: number) {
        return this.brandsRepository.delete(id);
    }
}