import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeaturedInService } from './featured-in.service';
import { FeaturedInController } from './featured-in.controller';
import { FeaturedIn } from './entities/featured-in.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeaturedIn]), AbilityModule],
  controllers: [FeaturedInController],
  providers: [FeaturedInService],
})
export class FeaturedInModule {}
