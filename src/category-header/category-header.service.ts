import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryHeaderDto } from './dto/create-category-header.dto';
import { UpdateCategoryHeaderDto } from './dto/update-category-header.dto';
import { CategoryHeader } from './entities/category-header.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryHeaderService {
  constructor(
    @InjectRepository(CategoryHeader)
    private readonly categoryHeaderRepository: Repository<CategoryHeader>,
  ) {}

  async create(createCategoryHeaderDto: CreateCategoryHeaderDto) {
    const result = await this.categoryHeaderRepository.save(
      createCategoryHeaderDto,
    );

    return result;
  }

  async findAll() {
    const result = await this.categoryHeaderRepository.find();
    return result;
  }

  // update(id: number, updateCategoryHeaderDto: UpdateCategoryHeaderDto) {
  //   return `This action updates a #${id} categoryHeader`;
  // }
}
