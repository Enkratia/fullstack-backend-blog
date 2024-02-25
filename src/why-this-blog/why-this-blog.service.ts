import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWhyThisBlogDto } from './dto/create-why-this-blog.dto';
import { UpdateWhyThisBlogDto } from './dto/update-why-this-blog.dto';
import { WhyThisBlog } from './entities/why-this-blog.entity';

@Injectable()
export class WhyThisBlogService {
  constructor(
    @InjectRepository(WhyThisBlog)
    private readonly whyThisBlogRepository: Repository<WhyThisBlog>,
  ) {}

  // async create(dto: CreateWhyThisBlogDto, imageUrl: string) {
  //   const whyThisBlog = new WhyThisBlog();
  //   whyThisBlog.title = dto.title;
  //   whyThisBlog.subtitle = dto.subtitle;
  //   whyThisBlog.description = dto.description;

  //   whyThisBlog.imageUrl = imageUrl;

  //   return await this.whyThisBlogRepository.save(whyThisBlog);
  // }

  async update(dto: UpdateWhyThisBlogDto, imageUrl: string | null) {
    const whyThisBlog = new WhyThisBlog();
    whyThisBlog.title = dto.title;
    whyThisBlog.subtitle = dto.subtitle;
    whyThisBlog.description = dto.description;

    whyThisBlog.id = 0;

    if (imageUrl) {
      whyThisBlog.imageUrl = imageUrl;
    }

    return await this.whyThisBlogRepository.save(whyThisBlog);
  }

  async findAll() {
    return await this.whyThisBlogRepository.find();
  }
}
