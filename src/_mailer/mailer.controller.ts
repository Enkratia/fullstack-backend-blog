import { Controller, Post, Query } from '@nestjs/common';

import { MailerService } from './mailer.service';
import { ISendEmail } from './interfaces/mail.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendMail(@Query() query: QueryType) {
    const dto: ISendEmail = {
      recipients: [
        {
          name: '',
          address: `${query.email}`,
        },
      ],
      subject: 'Subject',
      html: '<p>hello</p>',
    };

    return await this.mailerService.sendMail(dto);
  }
}
