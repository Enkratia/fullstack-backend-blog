import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ContactUsMessagesService } from './contact-us-messages.service';
import { ContactUsMessagesController } from './contact-us-messages.controller';
import { ContactUsMessage } from './entities/contact-us-message.entity';
import { MailerService } from '../_mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactUsMessage]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ContactUsMessagesController],
  providers: [ContactUsMessagesService, MailerService],
})
export class ContactUsMessagesModule {}
