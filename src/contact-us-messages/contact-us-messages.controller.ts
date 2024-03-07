import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Query,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { ContactUsMessagesService } from './contact-us-messages.service';
import { CreateContactUsMessageDto } from './dto/create-contact-us-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { ContactUsMessage } from './entities/contact-us-message.entity';

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
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: ContactUsMessage })
  async markAsRead(@Param('id') id: number) {
    return await this.contactUsMessagesService.markAsRead(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ContactUsMessage })
  async findById(@Param('id') id: number) {
    return await this.contactUsMessagesService.findById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: ContactUsMessage })
  async findAll(@Query() query: QueryType) {
    return await this.contactUsMessagesService.findAll(query);
  }
}
