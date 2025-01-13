export interface SubCategoryModelData {
  id: number;
  title: string;
  image: string;
  slug: string;
  categoryId: number | null;
}

export class SubCategoryModel {
  id: number;
  title: string;
  image: string;
  slug: string;
  categoryId: number | null;

  constructor(categoryData: SubCategoryModelData) {
    this.id = categoryData.id;
    this.title = categoryData.title;
    this.image = categoryData.image;
    this.categoryId = categoryData.categoryId;
    this.slug = categoryData.slug;
  }
}
