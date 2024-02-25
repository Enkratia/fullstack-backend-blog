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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  update(@Body() dto: UpdateTestimonialStaticDto) {
    return this.testimonialStaticService.update(dto);
  }

  @Get()
  findAll() {
    return this.testimonialStaticService.findAll();
  }
}
