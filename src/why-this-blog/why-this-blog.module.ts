import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhyThisBlogService } from './why-this-blog.service';
import { WhyThisBlogController } from './why-this-blog.controller';
import { WhyThisBlog } from './entities/why-this-blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhyThisBlog])],
  controllers: [WhyThisBlogController],
  providers: [WhyThisBlogService],
})
export class WhyThisBlogModule {}
