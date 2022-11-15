export interface ProductImageModelData {
    id: number;
    position: string;
    url: string;
    product_id: string;
}

class ProductImageModel {
    id: number;
    position: string;
    url: string;
    product_id: string;

    constructor(productImageData: ProductImageModelData) {
        this.id = productImageData.id;
        this.position = productImageData.position;
        this.url = productImageData.url;
        this.product_id = productImageData.product_id;
    }
}

export default ProductImageModel;