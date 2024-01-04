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
    const featuredIn = new FeaturedIn();
    featuredIn.title = dto.title;
    featuredIn.linkUrl = dto.linkUrl;
    featuredIn.imageUrl = imageUrl;

    return await this.repository.save(featuredIn);
  }

  async update(id: number, dto: UpdateFeaturedInDto, imageUrl: string | null) {
    const featuredIn = new FeaturedIn();
    featuredIn.title = dto.title;
    featuredIn.linkUrl = dto.linkUrl;

    featuredIn.id = id;

    if (imageUrl) {
      featuredIn.imageUrl = imageUrl;
    }

    return await this.repository.save(featuredIn);
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
