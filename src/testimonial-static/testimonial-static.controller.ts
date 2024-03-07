import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { TestimonialStaticService } from './testimonial-static.service';
import { CreateTestimonialStaticDto } from './dto/create-testimonial-static.dto';
import { UpdateTestimonialStaticDto } from './dto/update-testimonial-static.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { TestimonialStatic } from './entities/testimonial-static.entity';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { AbilitiesGuard } from '../ability/abilities.guard';

@Controller('testimonial-static')
export class TestimonialStaticController {
  constructor(
    private readonly testimonialStaticService: TestimonialStaticService,
  ) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // create(@Body() dto: CreateTestimonialStaticDto) {
  //   return this.testimonialStaticService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: TestimonialStatic })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateTestimonialStaticDto) {
    return await this.testimonialStaticService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.testimonialStaticService.findAll();
  }
}
