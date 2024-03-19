import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { MailerService } from '../_mailer/mailer.service';
import { Post } from '../posts/entities/post.entity';
import { FooterBottom } from '../footer-bottom/entities/footer-bottom.entity';
import { ISendEmail } from '../_mailer/types/types';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  // ***
  async create(dto: CreateSubscribeDto) {
    const email = dto.email.toLowerCase();

    const res = await this.findOneByEmail(email);
    if (res) return;

    const socialVars = await this.composeSocialTemplateVars();
    const token = await this.jwtService.signAsync({ email });
    const unsubscriptionUrl = socialVars.siteUrl + '/unsubscribe/' + token;

    const mailOptions = {
      recipients: [{ name: '', address: email }],
      subject: 'Subscription information',
      html: await this.mailerService.compileSubscriptionInformationTemplate({
        email,
        unsubscriptionUrl,
        ...socialVars,
      }),
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const subscribe = new Subscribe();
    subscribe.email = email;

    return await this.subscribeRepository.save(subscribe);
  }

  // ***
  async findAll() {
    return await this.subscribeRepository.find();
  }

  // ***
  async getCount() {
    // throw new BadRequestException();
    const count = await this.subscribeRepository.count();
    return { type: 'Subscribers', count };
  }

  // ***
  async findOneByEmail(email: string) {
    return await this.subscribeRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  // ***
  async sendMailToSubscribers() {
    const emails = await this.subscribeRepository
      .createQueryBuilder('s')
      .select('s.email AS email')
      .getRawMany();

    const recipients = emails.map((obj) => {
      return { name: '', address: obj.email };
    });

    const postVars = await this.composePostTemplateVars();
    const socialVars = await this.composeSocialTemplateVars();

    for (let recipient of recipients) {
      // set timeout if needed
      // await new Promise((resolve) => setTimeout(() => resolve(''), 10000));

      const token = await this.jwtService.signAsync({
        email: recipient.address,
      });
      const unsubscriptionLinkUrl = `${process.env.FRONTEND_URL}/unsubscribe/${token}`;

      const vars = { ...postVars, ...socialVars, unsubscriptionLinkUrl };

      const mailOptions: ISendEmail = {
        isNewsletter: true,
        recipients: [recipient],
        subject: 'Featured post on Finsweet',
        html: await this.mailerService.compileSubscriptionPostTemplate(vars),
      };

      try {
        await this.mailerService.sendMail(mailOptions);
      } catch (error) {
        // delete if not found (not every error) : TODO
        // await this.dataSource
        //   .getRepository(Subscribe)
        //   .delete({ email: recipient.address });
      }
    }
  }

  // ***
  async unsubscribeEmail(query: QueryType) {
    const { email } = await this.jwtService.verify(query.token);

    const isExist = await this.dataSource
      .getRepository(Subscribe)
      .findOne({ where: { email: email.toLowerCase() } });

    if (!isExist) throw new GoneException('Already unsubscribed');

    await this.dataSource
      .getRepository(Subscribe)
      .delete({ email: email.toLowerCase() });

    return { message: 'done' };
  }

  // ***
  async composeSocialTemplateVars() {
    const siteUrl = process.env.FRONTEND_URL;

    const imageBasenUrl = process.env.BACKEND_URL + '/images/social/';
    const facebookImageUrl = imageBasenUrl + 'facebook.png';
    const twitterImageUrl = imageBasenUrl + 'twitter.png';
    const instagramImageUrl = imageBasenUrl + 'instagram.png';
    const linkedinImageUrl = imageBasenUrl + 'linkedin.png';

    // **
    const footerBottom = await this.dataSource
      .getRepository(FooterBottom)
      .findOne({ where: { id: 0 } });

    if (!footerBottom) throw new InternalServerErrorException();

    const facebookLinkUrl = footerBottom.socialLinks.facebook;
    const twitterLinkUrl = footerBottom.socialLinks.twitter;
    const instagramLinkUrl = footerBottom.socialLinks.instagram;
    const linkedinLinkUrl = footerBottom.socialLinks.linkedin;

    return {
      facebookLinkUrl,
      twitterLinkUrl,
      instagramLinkUrl,
      linkedinLinkUrl,
      siteUrl,
      facebookImageUrl,
      twitterImageUrl,
      instagramImageUrl,
      linkedinImageUrl,
    };
  }

  // ***
  async composePostTemplateVars() {
    const post = await this.dataSource
      .getRepository(Post)
      .findOne({ where: { isFeatured: true } });

    if (!post) throw new BadRequestException('Featured post not found');

    const { title, imageUrl, category, contentText, id } = post;
    const readMoreUrl = `${process.env.FRONTEND_URL}/blog/${category}/${id}`;
    const description = contentText.substring(0, 280) + '...';

    return {
      title,
      imageUrl,
      readMoreUrl,
      description,
    };
  }
}
