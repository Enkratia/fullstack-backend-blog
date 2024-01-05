import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { FooterBottomService } from './footer-bottom.service';
import { CreateFooterBottomDto } from './dto/create-footer-bottom.dto';
import { UpdateFooterBottomDto } from './dto/update-footer-bottom.dto';

@Controller('footer-bottom')
export class FooterBottomController {
  constructor(private readonly footerBottomService: FooterBottomService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateFooterBottomDto) {
    return await this.footerBottomService.create(dto);
  }

  @Patch()
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateFooterBottomDto) {
    return await this.footerBottomService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.footerBottomService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.footerBottomService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.footerBottomService.remove(+id);
  // }
}
