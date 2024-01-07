import { Address } from 'nodemailer/lib/mailer';

export interface ISendEmail {
  from?: Address;
  recipients: Address[];
  subject: string;
  html: string;
  text?: string;
  placeholderReplacements?: Record<string, string>;
}
