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

import { KnowMoreService } from './know-more.service';
import { CreateKnowMoreDto } from './dto/create-know-more.dto';
import { UpdateKnowMoreDto } from './dto/update-know-more.dto';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { KnowMore } from './entities/know-more.entity';

@Controller('know-more')
export class KnowMoreController {
  constructor(private readonly knowMoreService: KnowMoreService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  // async create(
  //   @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
  //   @Body() dto: CreateKnowMoreDto,
  // ) {
  //   return await this.knowMoreService.create(dto, imageUrl);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: KnowMore })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Body() dto: UpdateKnowMoreDto,
  ) {
    return await this.knowMoreService.update(dto, imageUrl);
  }

  @Get()
  async findAll() {
    return await this.knowMoreService.findAll();
  }
}
