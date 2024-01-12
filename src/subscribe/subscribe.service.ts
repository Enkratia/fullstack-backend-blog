import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { MailerService } from '../_mailer/mailer.service';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    private mailerService: MailerService,
  ) {}

  async create(dto: CreateSubscribeDto) {
    const subscribe = new Subscribe();
    subscribe.email = dto.email;

    return this.subscribeRepository.save(subscribe);
  }

  async findAll() {
    return this.subscribeRepository.find();
  }

  async sendMailToSubscribers() {
    const emailsRaw = await this.subscribeRepository
      .createQueryBuilder('s')
      .select('s.email AS email')
      .getRawMany();

    const emails = emailsRaw.map((obj) => {
      return { name: '', address: obj.email };
    });

    console.log(emails);
    // const t = await this.mailerService.sendMail();
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
