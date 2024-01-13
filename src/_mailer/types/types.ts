import { Address } from 'nodemailer/lib/mailer';

export interface ISendEmail {
  from?: Address;
  recipients: Address[];
  subject: string;
  html?: string;
  text?: string;
  placeholderReplacements?: Record<string, string>;
}

// **
export interface ICompileEmailActivationTemplate {
  activationUrl: string;
  siteUrl: string;
  email: string;
}

// **
export interface ICompileSubscriptionPostTemplate {
  facebookLinkUrl: string;
  twitterLinkUrl: string;
  instagramLinkUrl: string;
  linkedinLinkUrl: string;
  description: string;
  readMoreUrl: string;
  imageUrl: string;
  title: string;
  siteUrl: string;
  facebookImageUrl: string;
  twitterImageUrl: string;
  instagramImageUrl: string;
  linkedinImageUrl: string;
  unsubscriptionLinkUrl: string;
}

// **
// export interface ICompileSubscriptionPostTemplate {
//   unsubscriptionLinkUrl: string;
//   siteUrl: string;
//   email: string;
//   facebookImageUrl: string;
//   twitterImageUrl: string;
//   instagramImageUrl: string;
//   linkedinImageUrl: string;
// }
