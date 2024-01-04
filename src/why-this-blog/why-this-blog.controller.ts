import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { WhyThisBlogService } from './why-this-blog.service';
import { CreateWhyThisBlogDto } from './dto/create-why-this-blog.dto';
import { UpdateWhyThisBlogDto } from './dto/update-why-this-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';

@Controller('why-this-blog')
export class WhyThisBlogController {
  constructor(private readonly whyThisBlogService: WhyThisBlogService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
    @Body() dto: CreateWhyThisBlogDto,
  ) {
    return await this.whyThisBlogService.create(dto, imageUrl);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Body() dto: UpdateWhyThisBlogDto,
  ) {
    return await this.whyThisBlogService.update(dto, imageUrl);
  }

  @Get()
  async findAll() {
    return await this.whyThisBlogService.findAll();
  }
}
