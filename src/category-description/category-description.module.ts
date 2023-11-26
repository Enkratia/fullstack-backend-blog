import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryDescriptionService } from './category-description.service';
import { CategoryDescriptionController } from './category-description.controller';
import { CategoryDescription } from './entities/category-description.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDescription])],
  controllers: [CategoryDescriptionController],
  providers: [CategoryDescriptionService],
})
export class CategoryDescriptionModule {}
