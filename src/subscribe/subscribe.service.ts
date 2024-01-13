import {
  BadRequestException,
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

@Injectable()
export class SubscribeService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    private mailerService: MailerService,
    private jwtService: JwtService,
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
    const emails = await this.subscribeRepository
      .createQueryBuilder('s')
      .select('s.email AS email')
      .getRawMany();

    const recipients = emails.map((obj) => {
      return { name: '', address: obj.email };
    });

    const mostVars = await this.composeMostTemplateVars();

    recipients.forEach(async (recipient) => {
      const token = this.jwtService.signAsync({ email: recipient.address });
      const unsubscriptionLinkUrl = `${process.env.FRONTEND_URL}/unsubscribe/${token}`;

      const vars = { ...mostVars, unsubscriptionLinkUrl };

      const mailOptions = {
        recipients: [recipient],
        subject: 'Featured post on Finsweet',
        html: await this.mailerService.compileSubscriptionPostTemplate(vars),
      };

      try {
        await this.mailerService.sendMail(mailOptions);
      } catch (error) {
        await this.dataSource
          .getRepository(Subscribe)
          .delete({ email: recipient.address });
      }
    });
  }

  async composeMostTemplateVars() {
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

    // **
    const post = await this.dataSource
      .getRepository(Post)
      .findOne({ where: { isFeatured: true } });

    if (!post) throw new BadRequestException('No featured post found');

    const { title, imageUrl, category, contentText, id } = post;
    const readMoreUrl = `${process.env.FRONTEND_URL}/blog/${category}/${id}`;
    const description = contentText.substring(0, 280) + '...';

    return {
      title,
      imageUrl,
      facebookLinkUrl,
      twitterLinkUrl,
      instagramLinkUrl,
      linkedinLinkUrl,
      readMoreUrl,
      description,
      siteUrl,
      facebookImageUrl,
      twitterImageUrl,
      instagramImageUrl,
      linkedinImageUrl,
    };
  }
}
