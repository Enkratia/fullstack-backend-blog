import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CategoryHeaderService } from './category-header.service';
import { CreateCategoryHeaderDto } from './dto/create-category-header.dto';
import { UpdateCategoryHeaderDto } from './dto/update-category-header.dto';

@Controller('category-header')
export class CategoryHeaderController {
  constructor(private readonly categoryHeaderService: CategoryHeaderService) {}

  // @Post()
  // create(@Body() createCategoryHeaderDto: CreateCategoryHeaderDto) {
  //   return this.categoryHeaderService.create(createCategoryHeaderDto);
  // }

  @Get()
  findAll() {
    return this.categoryHeaderService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryHeaderDto: UpdateCategoryHeaderDto) {
  //   return this.categoryHeaderService.update(+id, updateCategoryHeaderDto);
  // }
}
