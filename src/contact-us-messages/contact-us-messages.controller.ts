import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
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

  @Patch(':id')
  async markAsRead(@Param('id') id: number) {
    return await this.contactUsMessagesService.markAsRead(id);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.contactUsMessagesService.findById(id);
  }

  @Get()
  async findAll(@Query() query: QueryType) {
    return await this.contactUsMessagesService.findAll(query);
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
