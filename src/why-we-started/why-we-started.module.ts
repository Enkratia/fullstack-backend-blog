import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhyWeStartedService } from './why-we-started.service';
import { WhyWeStartedController } from './why-we-started.controller';
import { WhyWeStarted } from './entities/why-we-started.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([WhyWeStarted]), AbilityModule],
  controllers: [WhyWeStartedController],
  providers: [WhyWeStartedService],
})
export class WhyWeStartedModule {}
