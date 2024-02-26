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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { AboutUsStatic } from './entities/about-us-static.entity';

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
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: AboutUsStatic })
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
