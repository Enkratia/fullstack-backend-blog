import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsMissionDto } from './dto/create-us-mission.dto';
import { UpdateUsMissionDto } from './dto/update-us-mission.dto';
import { UsMission } from './entities/us-mission.entity';

@Injectable()
export class UsMissionService {
  constructor(
    @InjectRepository(UsMission)
    private readonly categoryHeaderRepository: Repository<UsMission>,
  ) {}

  async create(createUsMissionDto: CreateUsMissionDto) {
    return await this.categoryHeaderRepository.save(createUsMissionDto);
  }

  async findAll() {
    return await this.categoryHeaderRepository.find();
  }

  // update(id: number, updateUsMissionDto: UpdateUsMissionDto) {
  //   return `This action updates a #${id} usMission`;
  // }
}
