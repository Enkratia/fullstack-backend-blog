import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactUsQueriesService } from './contact-us-queries.service';
import { ContactUsQueriesController } from './contact-us-queries.controller';
import { ContactUsQuery } from './entities/contact-us-query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactUsQuery])],
  controllers: [ContactUsQueriesController],
  providers: [ContactUsQueriesService],
})
export class ContactUsQueriesModule {}
