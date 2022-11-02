export interface ProductModelData {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;
}

class ProductModel {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;
    constructor(productData: ProductModelData) {
        this.id = productData.id;
        this.title = productData.title;
        this.characteristics = productData.characteristics;
        this.description = productData.description;
        this.points = productData.points;
        this.price = productData.price;
    }
}

export default ProductModel;