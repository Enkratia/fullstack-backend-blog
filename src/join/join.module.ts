import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { Join } from './entities/join.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Join])],
  controllers: [JoinController],
  providers: [JoinService],
})
export class JoinModule {}
