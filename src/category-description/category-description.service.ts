import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDescriptionDto } from './dto/create-category-description.dto';
import { UpdateCategoryDescriptionDto } from './dto/update-category-description.dto';
import { CategoryDescription } from './entities/category-description.entity';

@Injectable()
export class CategoryDescriptionService {
  constructor(
    @InjectRepository(CategoryDescription)
    private readonly categoryDescriptionRepository: Repository<CategoryDescription>,
  ) {}

  // async create(createCategoryDescriptionDto: CreateCategoryDescriptionDto[]) {
  //   let response = [];

  //   for (const item of createCategoryDescriptionDto) {
  //     const result = await this.categoryDescriptionRepository.save(item);
  //     response.push(result);
  //   }

  //   return response;
  // }

  async findAll() {
    const response = await this.categoryDescriptionRepository.find();

    return response;
  }

  // update(id: number, updateCategoryDescriptionDto: UpdateCategoryDescriptionDto) {
  //   return `This action updates a #${id} categoryDescription`;
  // }
}
