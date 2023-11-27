import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TestimonialStaticService } from './testimonial-static.service';
import { CreateTestimonialStaticDto } from './dto/create-testimonial-static.dto';
import { UpdateTestimonialStaticDto } from './dto/update-testimonial-static.dto';

@Controller('testimonial-static')
export class TestimonialStaticController {
  constructor(
    private readonly testimonialStaticService: TestimonialStaticService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTestimonialStaticDto: CreateTestimonialStaticDto) {
    return this.testimonialStaticService.create(createTestimonialStaticDto);
  }

  @Get()
  findAll() {
    return this.testimonialStaticService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTestimonialStaticDto: UpdateTestimonialStaticDto) {
  //   return this.testimonialStaticService.update(+id, updateTestimonialStaticDto);
  // }
}
