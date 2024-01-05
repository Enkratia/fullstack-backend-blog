import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly repository: Repository<Subscribe>,
  ) {}

  async create(dto: CreateSubscribeDto) {
    const subscribe = new Subscribe();
    subscribe.email = dto.email;

    return this.repository.save(subscribe);
  }

  async findAll() {
    return this.repository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} subscribe`;
  // }

  // update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
  //   return `This action updates a #${id} subscribe`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} subscribe`;
  // }
}
