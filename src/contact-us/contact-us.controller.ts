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

import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { ContactUs } from './entities/contact-us.entity';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateContactUsDto) {
  //   return await this.contactUsService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: ContactUs })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateContactUsDto) {
    return await this.contactUsService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.contactUsService.findAll();
  }
}
