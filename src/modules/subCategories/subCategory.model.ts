export interface SubCategoryModelData {
    id: number;
    title: string;
    image: string;
    categoryId: number;
}

export class SubCategoryModel {
    id: number;
    title: string;
    image: string;
    categoryId: number;

    constructor(categoryData: SubCategoryModelData) {
        this.id = categoryData.id;
        this.title = categoryData.title;
        this.image = categoryData.image;
        this.categoryId = categoryData.categoryId
    }
}