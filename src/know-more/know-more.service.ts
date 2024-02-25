import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateKnowMoreDto } from './dto/create-know-more.dto';
import { UpdateKnowMoreDto } from './dto/update-know-more.dto';
import { KnowMore } from './entities/know-more.entity';

@Injectable()
export class KnowMoreService {
  constructor(
    @InjectRepository(KnowMore)
    private readonly knowMoreRepository: Repository<KnowMore>,
  ) {}

  // async create(dto: CreateKnowMoreDto, imageUrl: string) {
  //   const knowMore = new KnowMore();
  //   knowMore.title = dto.title;
  //   knowMore.subtitle = dto.subtitle;
  //   knowMore.description = dto.description;

  //   knowMore.imageUrl = imageUrl;

  //   return await this.knowMoreRepository.save(knowMore);
  // }

  async update(dto: UpdateKnowMoreDto, imageUrl: string | null) {
    const knowMore = new KnowMore();
    knowMore.title = dto.title;
    knowMore.subtitle = dto.subtitle;
    knowMore.description = dto.description;

    knowMore.id = 0;

    if (imageUrl) {
      knowMore.imageUrl = imageUrl;
    }

    return await this.knowMoreRepository.save(knowMore);
  }

  async findAll() {
    return await this.knowMoreRepository.find();
  }
}
