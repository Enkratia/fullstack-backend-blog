import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestimonialStaticService } from './testimonial-static.service';
import { TestimonialStaticController } from './testimonial-static.controller';
import { TestimonialStatic } from './entities/testimonial-static.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialStatic]), AbilityModule],
  controllers: [TestimonialStaticController],
  providers: [TestimonialStaticService],
})
export class TestimonialStaticModule {}
