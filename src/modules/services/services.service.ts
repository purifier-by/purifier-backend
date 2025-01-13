import { Injectable } from '@nestjs/common';
import ServicesDto from './services.dto';
import { ServicesRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(private readonly categoriesRepository: ServicesRepository) {}

  getServices() {
    return this.categoriesRepository.getAll();
  }

  getServicesById(id: number) {
    return this.categoriesRepository.getById(id);
  }

  createServices(categoryData: ServicesDto) {
    return this.categoriesRepository.create(categoryData);
  }

  updateServices(id: number, categoryData: ServicesDto) {
    return this.categoriesRepository.update(id, categoryData);
  }

  deleteServices(id: number) {
    return this.categoriesRepository.delete(id);
  }
}
