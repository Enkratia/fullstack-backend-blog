import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FooterBottomService } from './footer-bottom.service';
import { FooterBottomController } from './footer-bottom.controller';
import { FooterBottom } from './entities/footer-bottom.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([FooterBottom]), AbilityModule],
  controllers: [FooterBottomController],
  providers: [FooterBottomService],
})
export class FooterBottomModule {}
