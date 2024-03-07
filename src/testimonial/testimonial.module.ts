import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestimonialService } from './testimonial.service';
import { TestimonialController } from './testimonial.controller';
import { Testimonial } from './entities/testimonial.entity';
import { AbilityModule } from '../ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial]), AbilityModule],
  controllers: [TestimonialController],
  providers: [TestimonialService],
})
export class TestimonialModule {}
