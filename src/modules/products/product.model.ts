import { Exclude } from 'class-transformer';

export interface ProductModelData {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;
    brandId: number | null;
}

class ProductModel {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;

    @Exclude()
    brandId: number | null;

    constructor(productData: ProductModelData) {
        this.id = productData.id;
        this.title = productData.title;
        this.characteristics = productData.characteristics;
        this.description = productData.description;
        this.points = productData.points;
        this.price = productData.price;
        this.brandId = productData.brandId;
    }
}

export default ProductModel;