import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { Subscribe } from './entities/subscribe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribe])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
