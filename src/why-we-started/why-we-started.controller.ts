import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { WhyWeStartedService } from './why-we-started.service';
import { CreateWhyWeStartedDto } from './dto/create-why-we-started.dto';
import { UpdateWhyWeStartedDto } from './dto/update-why-we-started.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { WhyWeStarted } from './entities/why-we-started.entity';

@Controller('why-we-started')
export class WhyWeStartedController {
  constructor(private readonly whyWeStartedService: WhyWeStartedService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  // async create(
  //   @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
  //   @Body() dto: CreateWhyWeStartedDto,
  // ) {
  //   return await this.whyWeStartedService.create(dto, imageUrl);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: WhyWeStarted })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Body() dto: UpdateWhyWeStartedDto,
  ) {
    return await this.whyWeStartedService.update(dto, imageUrl);
  }

  @Get()
  async findAll() {
    return await this.whyWeStartedService.findAll();
  }
}
