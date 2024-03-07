import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhyThisBlogService } from './why-this-blog.service';
import { WhyThisBlogController } from './why-this-blog.controller';
import { WhyThisBlog } from './entities/why-this-blog.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhyThisBlog]), AbilityModule],
  controllers: [WhyThisBlogController],
  providers: [WhyThisBlogService],
})
export class WhyThisBlogModule {}
