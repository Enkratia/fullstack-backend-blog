import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AboutUsStaticService } from './about-us-static.service';
import { AboutUsStaticController } from './about-us-static.controller';
import { AboutUsStatic } from './entities/about-us-static.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUsStatic]), AbilityModule],
  controllers: [AboutUsStaticController],
  providers: [AboutUsStaticService],
})
export class AboutUsStaticModule {}
