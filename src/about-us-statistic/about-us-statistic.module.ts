import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutUsStatisticService } from './about-us-statistic.service';
import { AboutUsStatisticController } from './about-us-statistic.controller';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [AboutUsStatisticController],
  providers: [AboutUsStatisticService],
})
export class AboutUsStatisticModule {}
