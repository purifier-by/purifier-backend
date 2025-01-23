import { Injectable } from '@nestjs/common';
import CategoryDto from './category.dto';
import CategoriesRepository from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getAll();
  }

  getCategoryById(id: number) {
    return this.categoriesRepository.getById(id);
  }

  getCategoryBySlug(slug: string) {
    return this.categoriesRepository.getBySlug(slug);
  }

  createCategory(categoryData: CategoryDto) {
    return this.categoriesRepository.create(categoryData);
  }

  updateCategory(id: number, categoryData: CategoryDto) {
    return this.categoriesRepository.update(id, categoryData);
  }

  deleteCategory(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
