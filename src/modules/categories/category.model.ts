export interface CategoryModelData {
    id: number;
    title: string;
    image: string;
}

class CategoryModel {
    id: number;
    title: string;
    image: string;

    constructor(categoryData: CategoryModelData) {
        this.id = categoryData.id;
        this.title = categoryData.title;
        this.image = categoryData.image;
    }
}

export default CategoryModel;