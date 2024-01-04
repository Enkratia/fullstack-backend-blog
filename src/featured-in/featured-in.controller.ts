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

import { FeaturedInService } from './featured-in.service';
import { CreateFeaturedInDto } from './dto/create-featured-in.dto';
import { UpdateFeaturedInDto } from './dto/update-featured-in.dto';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';

@Controller('featured-in')
export class FeaturedInController {
  constructor(private readonly featuredInService: FeaturedInService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
    @Body() dto: CreateFeaturedInDto,
  ) {
    return await this.featuredInService.create(dto, imageUrl);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Param('id') id: number,
    @Body() dto: UpdateFeaturedInDto,
  ) {
    return this.featuredInService.update(id, dto, imageUrl);
  }

  @Get()
  async findAll() {
    return await this.featuredInService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.featuredInService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.featuredInService.remove(+id);
  // }
}
