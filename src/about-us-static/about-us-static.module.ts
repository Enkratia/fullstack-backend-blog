import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutUsStaticService } from './about-us-static.service';
import { AboutUsStaticController } from './about-us-static.controller';
import { AboutUsStatic } from './entities/about-us-static.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUsStatic])],
  controllers: [AboutUsStaticController],
  providers: [AboutUsStaticService],
})
export class AboutUsStaticModule {}
