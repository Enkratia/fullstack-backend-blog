import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { ContactUsQueriesService } from './contact-us-queries.service';
import { CreateContactUsQueryDto } from './dto/create-contact-us-query.dto';
import { UpdateContactUsQueryDto } from './dto/update-contact-us-query.dto';

@Controller('contact-us-queries')
export class ContactUsQueriesController {
  constructor(
    private readonly contactUsQueriesService: ContactUsQueriesService,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateContactUsQueryDto) {
    return await this.contactUsQueriesService.create(dto);
  }

  @Patch()
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateContactUsQueryDto) {
    return await this.contactUsQueriesService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.contactUsQueriesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contactUsQueriesService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactUsQueriesService.remove(+id);
  // }
}
