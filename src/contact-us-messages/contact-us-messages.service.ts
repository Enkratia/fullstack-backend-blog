import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContactUsMessageDto } from './dto/create-contact-us-message.dto';
import { ContactUsMessage } from './entities/contact-us-message.entity';

@Injectable()
export class ContactUsMessagesService {
  constructor(
    @InjectRepository(ContactUsMessage)
    private readonly repository: Repository<ContactUsMessage>,
  ) {}

  async create(dto: CreateContactUsMessageDto) {
    const contactUsMessage = new ContactUsMessage();
    contactUsMessage.fullname = dto.fullname;
    contactUsMessage.email = dto.email;
    contactUsMessage.query = dto.query;
    contactUsMessage.message = dto.message;

    return this.repository.save(contactUsMessage);
  }

  async findAll() {
    return this.repository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} contactUsMessage`;
  // }

  // update(id: number, updateContactUsMessageDto: UpdateContactUsMessageDto) {
  //   return `This action updates a #${id} contactUsMessage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} contactUsMessage`;
  // }
}
