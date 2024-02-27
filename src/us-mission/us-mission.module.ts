import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsMissionService } from './us-mission.service';
import { UsMissionController } from './us-mission.controller';
import { UsMission } from './entities/us-mission.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsMission]), AbilityModule],
  controllers: [UsMissionController],
  providers: [UsMissionService],
})
export class UsMissionModule {}
