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
    const email = dto.email.toLowerCase();

    const contactUsMessage = new ContactUsMessage();
    contactUsMessage.fullname = dto.fullname;
    contactUsMessage.email = email;
    contactUsMessage.query = dto.query;
    contactUsMessage.message = dto.message;

    const mailOptions = {
      recipients: [{ name: '', address: email }],
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

  async markAsRead(id: number) {
    const message = await this.repository.findOne({ where: { id } });
    message.read = true;

    await this.repository.save(message);
    return { message: 'done' };
  }

  async findAll(query: QueryType) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.repository.createQueryBuilder('c');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.where(
          `to_tsvector('simple', c.message) @@ to_tsquery('simple', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );

        qb.orWhere(
          `to_tsvector('simple', c.fullname) @@ to_tsquery('simple', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );
      }

      delete query._q;
    }

    // PAGINATION
    if (query._page) {
      const limit = query._limit ? +query._limit : 8;

      qb.take(limit);
      qb.skip((query._page - 1) * limit);

      delete query._page;
      delete query._limit;
    }

    // SORT (ORDER)
    if (query._sort) {
      const order = query._order?.toUpperCase() !== 'DESC' ? 'ASC' : 'DESC';
      qb.orderBy(`c.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }
}
