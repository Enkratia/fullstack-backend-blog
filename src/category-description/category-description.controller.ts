import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { CategoryDescriptionService } from './category-description.service';
import { UpdateCategoryDescriptionDto } from './dto/update-category-description.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDescriptionDto } from './dto/create-category-description.dto';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { CategoryDescription } from './entities/category-description.entity';

@Controller('category-description')
export class CategoryDescriptionController {
  constructor(
    private readonly categoryDescriptionService: CategoryDescriptionService,
  ) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateCategoryDescriptionDto) {
  //   return await this.categoryDescriptionService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: CategoryDescription })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateCategoryDescriptionDto) {
    return await this.categoryDescriptionService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.categoryDescriptionService.findAll();
  }
}
