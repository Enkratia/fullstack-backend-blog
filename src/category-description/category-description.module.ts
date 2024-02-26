import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryDescriptionService } from './category-description.service';
import { CategoryDescriptionController } from './category-description.controller';
import { CategoryDescription } from './entities/category-description.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryDescription]), AbilityModule],
  controllers: [CategoryDescriptionController],
  providers: [CategoryDescriptionService],
})
export class CategoryDescriptionModule {}
