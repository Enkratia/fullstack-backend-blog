import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { Join } from './entities/join.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([Join]), AbilityModule],
  controllers: [JoinController],
  providers: [JoinService],
})
export class JoinModule {}
