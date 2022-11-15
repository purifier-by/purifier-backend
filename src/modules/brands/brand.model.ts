export interface BrandModelData {
    id: number;
    title: string;
}

class BrandModel {
    id: number;
    title: string;

    constructor(brandData: BrandModelData) {
        this.id = brandData.id;
        this.title = brandData.title;
    }
}

export default BrandModel;