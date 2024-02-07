import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContactUsQueryDto } from './dto/create-contact-us-query.dto';
import { UpdateContactUsQueryDto } from './dto/update-contact-us-query.dto';
import { ContactUsQuery } from './entities/contact-us-query.entity';

@Injectable()
export class ContactUsQueriesService {
  constructor(
    @InjectRepository(ContactUsQuery)
    private readonly repository: Repository<ContactUsQuery>,
  ) {}

  async create(dto: CreateContactUsQueryDto) {
    const contactUsQuery = new ContactUsQuery(dto.content);
    return await this.repository.save(contactUsQuery);
  }

  async update(dto: UpdateContactUsQueryDto, id: number) {
    const contactUsQuery = new ContactUsQuery(dto.content);
    contactUsQuery.id = id;

    return await this.repository.save(contactUsQuery);
  }

  async findAll() {
    const res = await this.repository.find();
    return res;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} contactUsQuery`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contactUsQuery`;
  // }
}
