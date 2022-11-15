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

    createBrand(brandData: BrandDto) {
        return this.brandsRepository.create(brandData);
    }

    updateBrand(id: number, brandData: BrandDto) {
        return this.brandsRepository.update(id, brandData);
    }

    deleteBrand(id: number) {
        return this.brandsRepository.delete(id);
    }
}