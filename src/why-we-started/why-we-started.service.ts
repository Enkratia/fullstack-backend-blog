import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWhyWeStartedDto } from './dto/create-why-we-started.dto';
import { UpdateWhyWeStartedDto } from './dto/update-why-we-started.dto';
import { WhyWeStarted } from './entities/why-we-started.entity';

@Injectable()
export class WhyWeStartedService {
  constructor(
    @InjectRepository(WhyWeStarted)
    private readonly whyWeStartedRepository: Repository<WhyWeStarted>,
  ) {}

  async create(createWhyWeStartedDto: CreateWhyWeStartedDto) {
    const result = await this.whyWeStartedRepository.save(
      createWhyWeStartedDto,
    );

    return result;
  }

  async findAll() {
    const result = await this.whyWeStartedRepository.find();

    return result;
  }

  // update(id: number, updateWhyWeStartedDto: UpdateWhyWeStartedDto) {
  //   return `This action updates a #${id} whyWeStarted`;
  // }
}
