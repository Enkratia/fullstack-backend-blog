import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhyWeStartedService } from './why-we-started.service';
import { WhyWeStartedController } from './why-we-started.controller';
import { WhyWeStarted } from './entities/why-we-started.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhyWeStarted])],
  controllers: [WhyWeStartedController],
  providers: [WhyWeStartedService],
})
export class WhyWeStartedModule {}
