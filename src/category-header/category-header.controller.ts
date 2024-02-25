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

import { CategoryHeaderService } from './category-header.service';
import { UpdateCategoryHeaderDto } from './dto/update-category-header.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryHeaderDto } from './dto/create-category-header.dto';

@Controller('category-header')
export class CategoryHeaderController {
  constructor(private readonly categoryHeaderService: CategoryHeaderService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateCategoryHeaderDto) {
  //   return await this.categoryHeaderService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateCategoryHeaderDto) {
    return await this.categoryHeaderService.update(dto);
  }

  @Get()
  async findOne() {
    return await this.categoryHeaderService.findOne();
  }
}
