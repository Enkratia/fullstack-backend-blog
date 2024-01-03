import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeaturedInService } from './featured-in.service';
import { FeaturedInController } from './featured-in.controller';
import { FeaturedIn } from './entities/featured-in.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeaturedIn])],
  controllers: [FeaturedInController],
  providers: [FeaturedInService],
})
export class FeaturedInModule {}
