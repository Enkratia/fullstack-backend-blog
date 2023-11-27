import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { ContactUs } from './entities/contact-us.entity';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto) {
    const result = await this.contactUsRepository.save(createContactUsDto);
    return result;
  }

  async findAll() {
    const result = await this.contactUsRepository.find();
    return result;
  }

  // update(id: number, updateContactUsDto: UpdateContactUsDto) {
  //   return `This action updates a #${id} contactUs`;
  // }
}
