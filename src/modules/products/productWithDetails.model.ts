import BrandModel from '../brands/brand.model';
import { CategoryModel } from '../categories/category.model';
import { SubCategoryModel } from '../subCategories/subCategory.model';
import { ProductModel } from './product.model';

export interface ProductWithDetailsData {
  id: number;
  title: string;
  description: string;
  characteristics: string;
  points: string;
  price: number;

  brandId: number | null;
  categoryId: number | null;
  subCategoryId: number | null;

  images: string[];
  brand: BrandModel | null;
  category: CategoryModel | null;
  subCategory: SubCategoryModel | null;

  short_description: string | null;
}

class ProductWithDetails extends ProductModel {
  images: string[];
  brand: BrandModel | null;
  category: CategoryModel | null;
  subCategory: SubCategoryModel | null;

  constructor(productData: ProductWithDetailsData) {
    super(productData);
    this.images = productData.images;
    this.brand = productData.brand;
    this.category = productData.category;
    this.subCategory = productData.subCategory;
  }
}

export default ProductWithDetails;
