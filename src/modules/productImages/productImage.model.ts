export interface ProductImageModelData {
    id: number;
    position: number;
    url: string;
    productId: string;
}

class ProductImageModel {
    id: number;
    position: number;
    url: string;
    productId: string;

    constructor(productImageData: ProductImageModelData) {
        this.id = productImageData.id;
        this.position = productImageData.position;
        this.url = productImageData.url;
        this.productId = productImageData.productId;
    }
}

export default ProductImageModel;