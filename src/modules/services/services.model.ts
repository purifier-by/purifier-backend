export interface ServicesModelData {
  id: number;
  title: string;
  description: string;
  price: string;
}

export class ServicesModel {
  id: number;
  title: string;
  description: string;
  price: string;

  constructor(servicesData: ServicesModelData) {
    this.id = servicesData.id;
    this.title = servicesData.title;
    this.description = servicesData.description;
    this.price = servicesData.price;
  }
}
