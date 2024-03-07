import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactUsQueriesService } from './contact-us-queries.service';
import { ContactUsQueriesController } from './contact-us-queries.controller';
import { ContactUsQuery } from './entities/contact-us-query.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUsQuery]), AbilityModule],
  controllers: [ContactUsQueriesController],
  providers: [ContactUsQueriesService],
})
export class ContactUsQueriesModule {}
