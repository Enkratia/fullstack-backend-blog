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
    private readonly repository: Repository<WhyWeStarted>,
  ) {}

  // async create(dto: CreateWhyWeStartedDto, imageUrl: string) {
  //   const objToSave: WhyWeStarted = {
  //     ...dto,
  //     imageUrl,
  //     id: 0,
  //   };

  //   const result = await this.repository.save(objToSave);
  //   return result;
  // }

  async update(dto: UpdateWhyWeStartedDto, imageUrl: string | null) {
    const objToUpdate: Partial<WhyWeStarted> = {
      ...dto,
      id: 0,
    };

    if (imageUrl) {
      objToUpdate.imageUrl = imageUrl;
    }

    const result = await this.repository.save(objToUpdate);
    return result;
  }

  async findAll() {
    const result = await this.repository.find();
    return result;
  }
}
