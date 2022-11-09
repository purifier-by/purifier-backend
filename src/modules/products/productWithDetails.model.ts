import ProductModel from "./product.model";

export interface ProductWithDetailsData {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;
    images: string[]
}

class ProductWithDetails extends ProductModel {
    images: string[]
    constructor(productData: ProductWithDetailsData) {
        super(productData);
        this.images = productData.images
    }
}

export default ProductWithDetails