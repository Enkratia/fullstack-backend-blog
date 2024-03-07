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
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { FeaturedInService } from './featured-in.service';
import { CreateFeaturedInDto } from './dto/create-featured-in.dto';
import { UpdateFeaturedInDto } from './dto/update-featured-in.dto';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { FeaturedIn } from './entities/featured-in.entity';

@Controller('featured-in')
export class FeaturedInController {
  constructor(private readonly featuredInService: FeaturedInService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: FeaturedIn })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async create(
    @UploadedFile(FileRequiredPipe, SharpPipe) imageUrl: string,
    @Body() dto: CreateFeaturedInDto,
  ) {
    return await this.featuredInService.create(dto, imageUrl);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: FeaturedIn })
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async update(
    @UploadedFile(SharpPipe) imageUrl: string | null,
    @Param('id') id: number,
    @Body() dto: UpdateFeaturedInDto,
  ) {
    return await this.featuredInService.update(id, dto, imageUrl);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: FeaturedIn })
  async findOneById(@Param('id') id: number) {
    return await this.featuredInService.findOneById(+id);
  }

  @Get()
  async findAll(@Query() query: QueryType) {
    return await this.featuredInService.findAll(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: FeaturedIn })
  async remove(@Param('id') id: number) {
    return await this.featuredInService.remove(id);
  }
}
