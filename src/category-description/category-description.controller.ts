import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CategoryDescriptionService } from './category-description.service';
import { CreateCategoryDescriptionDto } from './dto/create-category-description.dto';
import { UpdateCategoryDescriptionDto } from './dto/update-category-description.dto';

@Controller('category-description')
export class CategoryDescriptionController {
  constructor(
    private readonly categoryDescriptionService: CategoryDescriptionService,
  ) {}

  @Post()
  create(@Body() createCategoryDescriptionDto: CreateCategoryDescriptionDto[]) {
    return this.categoryDescriptionService.create(createCategoryDescriptionDto);
  }

  @Get()
  findAll() {
    return this.categoryDescriptionService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDescriptionDto: UpdateCategoryDescriptionDto) {
  //   return this.categoryDescriptionService.update(+id, updateCategoryDescriptionDto);
  // }
}
