import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWhyWeStartedDto } from './dto/create-why-we-started.dto';
import { UpdateWhyWeStartedDto } from './dto/update-why-we-started.dto';
import { WhyWeStarted } from './entities/why-we-started.entity';

@Injectable()
export class WhyWeStartedService {
  constructor(
    @InjectRepository(WhyWeStarted)
    private readonly repository: Repository<WhyWeStarted>,
  ) {}

  // async create(dto: CreateWhyWeStartedDto, imageUrl: string) {
  //   const whyWeStarted = new WhyWeStarted();
  //   whyWeStarted.title = dto.title;
  //   whyWeStarted.subtitle = dto.subtitle;
  //   whyWeStarted.description = dto.description;

  //   whyWeStarted.imageUrl = imageUrl;

  //   return await this.repository.save(whyWeStarted);
  // }

  async update(dto: UpdateWhyWeStartedDto, imageUrl: string | null) {
    const whyWeStarted = new WhyWeStarted();
    whyWeStarted.title = dto.title;
    whyWeStarted.subtitle = dto.subtitle;
    whyWeStarted.description = dto.description;

    whyWeStarted.id = 0;

    if (imageUrl) {
      whyWeStarted.imageUrl = imageUrl;
    }

    return await this.repository.save(whyWeStarted);
  }

  async findAll() {
    return await this.repository.find();
  }
}
