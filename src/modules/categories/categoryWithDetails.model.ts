import BrandModel from "../brands/brand.model";
import { SubCategoryModel } from "../subCategories/subCategory.model";
import { CategoryModel } from "./category.model";

export interface CategoryWithDetailsData {
    id: number;
    title: string;
    image: string;
    subCategories: SubCategoryModel[]
}

export class CategoryWithDetails extends CategoryModel {
    subCategories: SubCategoryModel[]
    constructor(categoryData: CategoryWithDetailsData) {
        super(categoryData);
        this.subCategories = categoryData.subCategories
    }
}