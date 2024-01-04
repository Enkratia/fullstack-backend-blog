import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { CategoryDescriptionService } from './category-description.service';
import { CreateCategoryDescriptionDto } from './dto/create-category-description.dto';
import { UpdateCategoryDescriptionDto } from './dto/update-category-description.dto';

@Controller('category-description')
export class CategoryDescriptionController {
  constructor(
    private readonly categoryDescriptionService: CategoryDescriptionService,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateCategoryDescriptionDto) {
    return await this.categoryDescriptionService.create(dto);
  }

  @Patch()
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateCategoryDescriptionDto) {
    return await this.categoryDescriptionService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.categoryDescriptionService.findAll();
  }
}
