export interface CategoryModelData {
  id: number;
  title: string;
  image: string;
  slug: string;
}

export class CategoryModel {
  id: number;
  title: string;
  image: string;
  slug: string;

  constructor(categoryData: CategoryModelData) {
    this.id = categoryData.id;
    this.title = categoryData.title;
    this.image = categoryData.image;
    this.slug = categoryData.slug;
  }
}
