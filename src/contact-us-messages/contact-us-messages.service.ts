import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContactUsMessageDto } from './dto/create-contact-us-message.dto';
import { ContactUsMessage } from './entities/contact-us-message.entity';
import { MailerService } from '../_mailer/mailer.service';

@Injectable()
export class ContactUsMessagesService {
  constructor(
    @InjectRepository(ContactUsMessage)
    private readonly repository: Repository<ContactUsMessage>,
    private readonly mailerService: MailerService,
  ) {}

  async create(dto: CreateContactUsMessageDto) {
    const contactUsMessage = new ContactUsMessage();
    contactUsMessage.fullname = dto.fullname;
    contactUsMessage.email = dto.email;
    contactUsMessage.query = dto.query;
    contactUsMessage.message = dto.message;

    const mailOptions = {
      recipients: [{ name: '', address: dto.email }],
      subject: 'Message received',
      html: await this.mailerService.compileMessageReceivedTemplate(),
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw new BadRequestException(error);
    }

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
