import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestimonialStaticService } from './testimonial-static.service';
import { TestimonialStaticController } from './testimonial-static.controller';
import { TestimonialStatic } from './entities/testimonial-static.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialStatic])],
  controllers: [TestimonialStaticController],
  providers: [TestimonialStaticService],
})
export class TestimonialStaticModule {}
