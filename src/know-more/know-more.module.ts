import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KnowMoreService } from './know-more.service';
import { KnowMoreController } from './know-more.controller';
import { KnowMore } from './entities/know-more.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([KnowMore]), AbilityModule],
  controllers: [KnowMoreController],
  providers: [KnowMoreService],
})
export class KnowMoreModule {}
