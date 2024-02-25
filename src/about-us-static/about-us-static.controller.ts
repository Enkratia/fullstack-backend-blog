import {
  Controller,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { AboutUsStaticService } from './about-us-static.service';
import { UpdateAboutUsStaticDto } from './dto/update-about-us-static.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('about-us-static')
export class AboutUsStaticController {
  constructor(private readonly aboutUsStaticService: AboutUsStaticService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  // async create(
  //   @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
  //   @Body() dto: CreateAboutUsStaticDto,
  // ) {
  //   return await this.aboutUsStaticService.create(dto, imageUrl);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard)
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
}
