import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateContactUsDto) {
    return await this.contactUsService.create(dto);
  }

  @Patch()
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateContactUsDto) {
    return await this.contactUsService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.contactUsService.findAll();
  }
}
