import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { ContactUs } from './entities/contact-us.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUs]), AbilityModule],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
