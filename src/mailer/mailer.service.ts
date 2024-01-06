import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { ISendEmail } from './mail.interface';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // pool: true,
      // host: this.configService.get('MAIL_HOST'),
      // port: this.configService.get<number>('MAIL_PORT', { infer: true }),
      secure: true, // use TLS
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    return transporter;
  }

  async sendMail(dto: ISendEmail) {
    const { recipients, subject, html } = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: {
        name: process.env.MAIL_USER,
        address: process.env.MAIL_ADDRESS,
      },
      to: recipients,
      subject,
      html,
    };

    try {
      return await transport.sendMail(options);
    } catch (error) {
      console.log(error);
    }
  }
}
