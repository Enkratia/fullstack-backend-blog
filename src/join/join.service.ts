import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { Join } from './entities/join.entity';

@Injectable()
export class JoinService {
  constructor(
    @InjectRepository(Join) private readonly joinRepository: Repository<Join>,
  ) {}

  async create(createJoinDto: CreateJoinDto) {
    const result = await this.joinRepository.save(createJoinDto);

    return result;
  }

  async findAll() {
    const result = await this.joinRepository.find();

    return result;
  }

  // update(id: number, updateJoinDto: UpdateJoinDto) {
  //   return `This action updates a #${id} join`;
  // }
}
