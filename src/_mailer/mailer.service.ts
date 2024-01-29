import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import {
  emailActivation,
  forgetEmail,
  subscriptionInformation,
  subscriptionPost,
} from './templates';

import {
  ICompileResetEmailTemplate,
  ICompileSubscriptionInformationTemplate,
  ISendEmail,
} from './types/types';

import {
  ICompileEmailActivationTemplate,
  ICompileSubscriptionPostTemplate,
} from './types/types';

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

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      throw new Error();
    }
  }

  // **
  async compileEmailActivationTemplate({ email }: { email: string }) {
    const siteUrl = process.env.FRONTEND_URL;
    const activationToken = await this.jwtService.signAsync({ email });

    const vars: ICompileEmailActivationTemplate = {
      email: email,
      siteUrl: siteUrl,
      activationUrl: siteUrl + '/auth/activation/' + activationToken,
    };

    const template = Handlebars.compile(emailActivation);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // **
  async compileResetEmailTemplate({ email }: { email: string }) {
    const siteUrl = process.env.FRONTEND_URL;
    const resetToken = await this.jwtService.signAsync({ email });

    const vars: ICompileResetEmailTemplate = {
      email: email,
      siteUrl: siteUrl,
      resetPasswordUrl: siteUrl + '/auth/reset/' + resetToken,
    };

    const template = Handlebars.compile(forgetEmail);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // **
  async compileSubscriptionInformationTemplate(
    vars: ICompileSubscriptionInformationTemplate,
  ) {
    const template = Handlebars.compile(subscriptionInformation);
    const htmlBody = template(vars);

    return htmlBody;
  }

  // **
  async compileSubscriptionPostTemplate(
    vars: ICompileSubscriptionPostTemplate,
  ) {
    const template = Handlebars.compile(subscriptionPost);

    const htmlBody = template(vars);
    return htmlBody;
  }
}
