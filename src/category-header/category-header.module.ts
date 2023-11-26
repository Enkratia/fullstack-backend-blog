import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryHeaderService } from './category-header.service';
import { CategoryHeaderController } from './category-header.controller';
import { CategoryHeader } from './entities/category-header.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryHeader])],
  controllers: [CategoryHeaderController],
  providers: [CategoryHeaderService],
})
export class CategoryHeaderModule {}
