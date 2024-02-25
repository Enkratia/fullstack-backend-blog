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

import { UsMissionService } from './us-mission.service';
import { CreateUsMissionDto } from './dto/create-us-mission.dto';
import { UpdateUsMissionDto } from './dto/update-us-mission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('us-mission')
export class UsMissionController {
  constructor(private readonly usMissionService: UsMissionService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateUsMissionDto) {
  //   return await this.usMissionService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateUsMissionDto) {
    return await this.usMissionService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.usMissionService.findAll();
  }
}
