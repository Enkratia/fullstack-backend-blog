import { BadRequestException, Injectable } from '@nestjs/common';
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
    const headers = [];

    for (let key in dto) {
      const categoryHeader = new CategoryHeader();
      categoryHeader.category = key;
      categoryHeader.description = dto[key];
      headers.push(categoryHeader);
    }

    return await this.categoryHeaderRepository.save(headers);
  }

  async update(dto: UpdateCategoryHeaderDto) {
    const headers = [];

    for (let key in dto) {
      const categoryHeader = new CategoryHeader();
      categoryHeader.category = key;
      categoryHeader.description = dto[key];
      headers.push(categoryHeader);
    }

    return await this.categoryHeaderRepository.save(headers);
  }

  async findAll(query: QueryType) {
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.categoryHeaderRepository.createQueryBuilder('h');

    for (let q in query) {
      let keyMedium = '';
      let mediumValue = {};

      keyMedium = `h.${q} = :${q}`;
      mediumValue[`${q}`] = query[q];

      qb.where(keyMedium, mediumValue);
    }

    return await qb.getMany();
  }
}
