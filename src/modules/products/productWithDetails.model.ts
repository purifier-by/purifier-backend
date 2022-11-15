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
    brandId: number | null;
    brand: BrandModel | null;
    categoryId: number | null;
    subCategoryId: number | null;
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