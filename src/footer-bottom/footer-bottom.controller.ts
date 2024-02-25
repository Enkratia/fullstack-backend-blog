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

import { FooterBottomService } from './footer-bottom.service';
import { CreateFooterBottomDto } from './dto/create-footer-bottom.dto';
import { UpdateFooterBottomDto } from './dto/update-footer-bottom.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('footer-bottom')
export class FooterBottomController {
  constructor(private readonly footerBottomService: FooterBottomService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateFooterBottomDto) {
  //   return await this.footerBottomService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateFooterBottomDto) {
    return await this.footerBottomService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.footerBottomService.findAll();
  }
}
