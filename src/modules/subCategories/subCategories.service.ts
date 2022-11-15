import { Injectable } from "@nestjs/common";
import { SubCategoryDto } from "./subCategory.dto";
import { SubCategoriesRepository } from "./subCategories.repository";

@Injectable()
export class SubCategoriesService {
    constructor(
        private readonly subCategoriesRepository: SubCategoriesRepository,
    ) { }

    getCategories() {
        return this.subCategoriesRepository.getAll();
    }

    getCategoryById(id: number) {
        return this.subCategoriesRepository.getById(id);
    }

    createCategory(categoryData: SubCategoryDto) {
        return this.subCategoriesRepository.create(categoryData);
    }

    updateCategory(id: number, categoryData: SubCategoryDto) {
        return this.subCategoriesRepository.update(id, categoryData);
    }

    deleteCategory(id: number) {
        return this.subCategoriesRepository.delete(id);
    }
}