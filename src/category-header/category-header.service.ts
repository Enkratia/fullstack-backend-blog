import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryHeaderDto } from './dto/create-category-header.dto';
import { UpdateCategoryHeaderDto } from './dto/update-category-header.dto';
import { CategoryHeader } from './entities/category-header.entity';

@Injectable()
export class CategoryHeaderService {
  constructor(
    @InjectRepository(CategoryHeader)
    private readonly categoryHeaderRepository: Repository<CategoryHeader>,
  ) {}

  async create(dto: CreateCategoryHeaderDto) {
    const categoryHeader = new CategoryHeader();
    categoryHeader.business = dto.business;
    categoryHeader.economy = dto.economy;
    categoryHeader.technology = dto.technology;
    categoryHeader.startup = dto.startup;

    return await this.categoryHeaderRepository.save(categoryHeader);
  }

  async update(dto: UpdateCategoryHeaderDto) {
    const categoryHeader = new CategoryHeader();
    categoryHeader.business = dto.business;
    categoryHeader.economy = dto.economy;
    categoryHeader.technology = dto.technology;
    categoryHeader.startup = dto.startup;

    categoryHeader.id = 0;

    return await this.categoryHeaderRepository.save(categoryHeader);
  }

  async findAll() {
    return await this.categoryHeaderRepository.find();
  }
}
