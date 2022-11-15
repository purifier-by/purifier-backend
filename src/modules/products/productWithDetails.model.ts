import BrandModel from "../brands/brand.model";
import ProductModel from "./product.model";

export interface ProductWithDetailsData {
    id: number;
    title: string;
    description: string;
    characteristics: string;
    points: string;
    price: number;
    images: string[];
    brand_id: number | null;
    brand: BrandModel | null;
}

class ProductWithDetails extends ProductModel {
    images: string[];
    brand: BrandModel | null
    constructor(productData: ProductWithDetailsData) {
        super(productData);
        this.images = productData.images
        this.brand = productData.brand
    }
}

export default ProductWithDetails