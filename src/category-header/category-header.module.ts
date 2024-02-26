import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryHeaderService } from './category-header.service';
import { CategoryHeaderController } from './category-header.controller';
import { CategoryHeader } from './entities/category-header.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryHeader]), AbilityModule],
  controllers: [CategoryHeaderController],
  providers: [CategoryHeaderService],
})
export class CategoryHeaderModule {}
