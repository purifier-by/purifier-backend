import { Exclude } from 'class-transformer';

export interface ProductModelData {
  id: number;
  title: string;
  description: string;
  characteristics: string;
  points: string;
  price: number;
  brandId: number | null;
  categoryId: number | null;
  subCategoryId: number | null;
  short_description: string | null;
  slug: string;
}

export class ProductModel {
  id: number;
  title: string;
  description: string;
  characteristics: string;
  points: string;
  price: number;
  slug: string;
  shortDescription: string | null;

  @Exclude()
  brandId: number | null;

  @Exclude()
  categoryId: number | null;

  @Exclude()
  subCategoryId: number | null;

  constructor(productData: ProductModelData) {
    this.id = productData.id;
    this.title = productData.title;
    this.characteristics = productData.characteristics;
    this.description = productData.description;
    this.points = productData.points;
    this.price = productData.price;
    this.brandId = productData.brandId;
    this.categoryId = productData.categoryId;
    this.subCategoryId = productData.subCategoryId;
    this.slug = productData.slug;
    this.shortDescription = productData['short_description'];
  }
}
