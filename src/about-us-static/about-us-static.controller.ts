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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { AboutUsStaticService } from './about-us-static.service';
import { CreateAboutUsStaticDto } from './dto/create-about-us-static.dto';
import { UpdateAboutUsStaticDto } from './dto/update-about-us-static.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';

@Controller('about-us-static')
export class AboutUsStaticController {
  constructor(private readonly aboutUsStaticService: AboutUsStaticService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
    @Body() dto: CreateAboutUsStaticDto,
  ) {
    return await this.aboutUsStaticService.create(dto, imageUrl);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Body() dto: UpdateAboutUsStaticDto,
  ) {
    return await this.aboutUsStaticService.update(dto, imageUrl);
  }

  @Get()
  async findAll() {
    return await this.aboutUsStaticService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aboutUsStaticService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aboutUsStaticService.remove(+id);
  // }
}
