import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactUsMessagesService } from './contact-us-messages.service';
import { ContactUsMessagesController } from './contact-us-messages.controller';
import { ContactUsMessage } from './entities/contact-us-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUsMessage])],
  controllers: [ContactUsMessagesController],
  providers: [ContactUsMessagesService],
})
export class ContactUsMessagesModule {}
