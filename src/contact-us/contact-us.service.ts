import { BadRequestException, Injectable } from '@nestjs/common';
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

  // async create(dto: CreateContactUsDto) {
  //   const contactUs = new ContactUs();
  //   contactUs.header = {
  //     title: dto.headerTitle,
  //     subtitle: dto.headerSubtitle,
  //     description: dto.headerDescription,
  //   };
  //   contactUs.time = {
  //     days: dto.timeDays,
  //     hours: dto.timeHours,
  //     description: dto.timeDescription,
  //   };
  //   contactUs.contact = {
  //     phone: dto.contactPhone,
  //     email: dto.contactEmail,
  //   };

  //   return await this.contactUsRepository.save(contactUs);
  // }

  async update(dto: UpdateContactUsDto) {
    const contactUs = new ContactUs();
    contactUs.header = {
      title: dto.headerTitle,
      subtitle: dto.headerSubtitle,
      description: dto.headerDescription,
    };
    contactUs.time = {
      days: dto.timeDays,
      hours: dto.timeHours,
      description: dto.timeDescription,
    };
    contactUs.contact = {
      phone: dto.contactPhone,
      email: dto.contactEmail,
    };

    contactUs.id = 0;

    return await this.contactUsRepository.save(contactUs);
  }

  async findAll() {
    return await this.contactUsRepository.find();
  }
}
