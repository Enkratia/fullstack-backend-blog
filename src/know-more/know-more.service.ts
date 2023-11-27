import { Injectable } from '@nestjs/common';
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

  async create(createKnowMoreDto: CreateKnowMoreDto) {
    const result = await this.knowMoreRepository.save(createKnowMoreDto);
    return result;
  }

  async findAll() {
    const result = await this.knowMoreRepository.find();
    return result;
  }

  // update(id: number, updateKnowMoreDto: UpdateKnowMoreDto) {
  //   return `This action updates a #${id} knowMore`;
  // }
}
