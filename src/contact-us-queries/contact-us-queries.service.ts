import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateContactUsQueryDto } from './dto/create-contact-us-query.dto';
import { UpdateContactUsQueryDto } from './dto/update-contact-us-query.dto';
import { ContactUsQuery } from './entities/contact-us-query.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactUsQueriesService {
  constructor(
    @InjectRepository(ContactUsQuery)
    private readonly repository: Repository<ContactUsQuery>,
  ) {}

  async create(dto: CreateContactUsQueryDto) {
    const contactUsQuery = new ContactUsQuery();
    const queries = dto.queries.split(',').map((el) => el.trim());
    contactUsQuery.queries = queries;

    return await this.repository.save(contactUsQuery);
  }

  async update(dto: UpdateContactUsQueryDto) {
    const contactUsQuery = new ContactUsQuery();
    const queries = dto.queries.split(',').map((el) => el.trim());
    contactUsQuery.queries = queries;

    contactUsQuery.id = 0;

    return await this.repository.save(contactUsQuery);
  }

  async findAll() {
    const result = await this.repository.find();
    return result[0].queries;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} contactUsQuery`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contactUsQuery`;
  // }
}
