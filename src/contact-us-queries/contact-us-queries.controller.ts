import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { ContactUsQueriesService } from './contact-us-queries.service';
import { CreateContactUsQueryDto } from './dto/create-contact-us-query.dto';
import { UpdateContactUsQueryDto } from './dto/update-contact-us-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contact-us-queries')
export class ContactUsQueriesController {
  constructor(
    private readonly contactUsQueriesService: ContactUsQueriesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateContactUsQueryDto) {
    return await this.contactUsQueriesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateContactUsQueryDto, @Param('id') id: number) {
    return await this.contactUsQueriesService.update(dto, id);
  }

  @Get()
  async findAll(@Query() query: QueryType) {
    return await this.contactUsQueriesService.findAll(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number) {
    return await this.contactUsQueriesService.remove(id);
  }
}
