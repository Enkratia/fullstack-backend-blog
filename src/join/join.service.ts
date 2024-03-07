import { BadRequestException, Injectable } from '@nestjs/common';
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

  // async create(dto: CreateJoinDto) {
  //   const join = new Join();
  //   join.title = dto.title;
  //   join.description = dto.description;

  //   return await this.joinRepository.save(join);
  // }

  async update(dto: UpdateJoinDto) {
    const join = new Join();
    join.title = dto.title;
    join.description = dto.description;

    join.id = 0;

    return await this.joinRepository.save(join);
  }

  async findAll() {
    return await this.joinRepository.find();
  }
}
