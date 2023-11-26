import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsMissionService } from './us-mission.service';
import { UsMissionController } from './us-mission.controller';
import { UsMission } from './entities/us-mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsMission])],
  controllers: [UsMissionController],
  providers: [UsMissionService],
})
export class UsMissionModule {}
