import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFeaturedInDto } from './dto/create-featured-in.dto';
import { UpdateFeaturedInDto } from './dto/update-featured-in.dto';
import { FeaturedIn } from './entities/featured-in.entity';

@Injectable()
export class FeaturedInService {
  constructor(
    @InjectRepository(FeaturedIn)
    private readonly repository: Repository<FeaturedIn>,
  ) {}

  async create(dto: CreateFeaturedInDto, imageUrl: string) {
    const objToCreate = {
      ...dto,
      imageUrl,
    };

    return await this.repository.save(objToCreate);
  }

  async update(id: number, dto: UpdateFeaturedInDto, imageUrl: string | null) {
    const objToUpdate: Partial<FeaturedIn> = {
      ...dto,
      id,
    };

    if (imageUrl) {
      objToUpdate.imageUrl = imageUrl;
    }

    return await this.repository.save(objToUpdate);
  }

  async findAll() {
    return await this.repository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} featuredIn`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} featuredIn`;
  // }
}
