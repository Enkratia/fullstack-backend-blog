import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { ContactUsMessagesService } from './contact-us-messages.service';
import { CreateContactUsMessageDto } from './dto/create-contact-us-message.dto';

@Controller('contact-us-messages')
export class ContactUsMessagesController {
  constructor(
    private readonly contactUsMessagesService: ContactUsMessagesService,
  ) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateContactUsMessageDto) {
    return await this.contactUsMessagesService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.contactUsMessagesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contactUsMessagesService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactUsMessagesService.remove(+id);
  // }
}
