import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { ISendEmail } from './types/types';

@Injectable()
export class MailerService {
  mailTransport() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // pool: true,
      // host: process.env.MAIL_HOST,
      // port: +process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
      greetingTimeout: 1000,
      dnsTimeout: 1000,
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

      // Добавить удаление почт при ошибке 550
    }
  }
}
