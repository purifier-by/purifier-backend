import { SubCategoryModel } from '../subCategories/subCategory.model';
import { CategoryModel } from './category.model';

export interface CategoryWithDetailsData {
  id: number;
  title: string;
  image: string;
  subCategories: SubCategoryModel[];
  totalProductsCount: string;
}

export class CategoryWithDetails extends CategoryModel {
  subCategories: SubCategoryModel[];
  totalProductsCount: number;
  constructor(categoryData: CategoryWithDetailsData) {
    super(categoryData);
    this.subCategories = categoryData.subCategories;
    this.totalProductsCount = Number(categoryData.totalProductsCount);
  }
}
