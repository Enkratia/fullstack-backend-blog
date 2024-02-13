import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Body() dto: CreateTestimonialDto,
  ) {
    return await this.testimonialService.create(dto, imageUrl);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.testimonialService.findOneById(id);
  }

  @Get()
  async findAll(@Query() query: QueryType) {
    return await this.testimonialService.findAll(query);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Param('id') id: number,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return await this.testimonialService.update(id, dto, imageUrl);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.testimonialService.remove(id);
  }
}
