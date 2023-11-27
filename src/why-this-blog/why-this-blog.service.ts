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

  async create(createWhyThisBlogDto: CreateWhyThisBlogDto) {
    const result = await this.whyThisBlogRepository.save(createWhyThisBlogDto);
    return result;
  }

  async findAll() {
    const result = await this.whyThisBlogRepository.find();
    return result;
  }

  // update(id: number, updateWhyThisBlogDto: UpdateWhyThisBlogDto) {
  //   return `This action updates a #${id} whyThisBlog`;
  // }
}
