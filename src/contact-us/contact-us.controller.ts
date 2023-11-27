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

import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }

  @Get()
  findAll() {
    return this.contactUsService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
  //   return this.contactUsService.update(+id, updateContactUsDto);
  // }
}
