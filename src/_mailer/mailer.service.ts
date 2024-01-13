import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { ISendEmail } from './types/types';
import { emailActivation } from './templates/emailActivation';
import {
  ICompileEmailActivationTemplate,
  ICompileSubscriptionPostTemplate,
} from './types/types';
import { subscriptionPost } from './templates/subscriptionPost';

@Injectable()
export class MailerService {
  constructor(private jwtService: JwtService) {}

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

    return await transport.sendMail(options);
  }

  // **
  async compileEmailActivationTemplate({ email }: { email: string }) {
    const siteUrl = process.env.FRONTEND_URL;
    const activationToken = await this.jwtService.signAsync({ email });

    const vars: ICompileEmailActivationTemplate = {
      email: email,
      siteUrl: siteUrl,
      activationUrl: siteUrl + '/activation/' + activationToken,
    };

    const template = Handlebars.compile(emailActivation);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // **
  // async compileSubscriptionResponseTemplate({ email }: { email: string }) {}

  // **
  async compileSubscriptionPostTemplate(
    vars: ICompileSubscriptionPostTemplate,
  ) {
    const template = Handlebars.compile(subscriptionPost);

    const htmlBody = template(vars);
    return htmlBody;
  }
}
