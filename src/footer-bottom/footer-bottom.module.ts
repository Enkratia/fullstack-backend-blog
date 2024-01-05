import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FooterBottomService } from './footer-bottom.service';
import { FooterBottomController } from './footer-bottom.controller';
import { FooterBottom } from './entities/footer-bottom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FooterBottom])],
  controllers: [FooterBottomController],
  providers: [FooterBottomService],
})
export class FooterBottomModule {}
