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

  // async create(dto: CreateCategoryDescriptionDto) {
  //   const categoryDescription = new CategoryDescription();
  //   categoryDescription.business = dto.business;
  //   categoryDescription.economy = dto.economy;
  //   categoryDescription.startup = dto.startup;
  //   categoryDescription.technology = dto.technology;

  //   return await this.categoryDescriptionRepository.save(categoryDescription);
  // }

  async update(dto: UpdateCategoryDescriptionDto) {
    const categoryDescription = new CategoryDescription();
    categoryDescription.business = dto.business;
    categoryDescription.economy = dto.economy;
    categoryDescription.startup = dto.startup;
    categoryDescription.technology = dto.technology;

    categoryDescription.id = 0;

    return await this.categoryDescriptionRepository.save(categoryDescription);
  }

  async findAll() {
    return await this.categoryDescriptionRepository.find();
  }
}
