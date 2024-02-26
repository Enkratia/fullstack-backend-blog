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

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { ContactUsQuery } from './entities/contact-us-query.entity';

@Controller('contact-us-queries')
export class ContactUsQueriesController {
  constructor(
    private readonly contactUsQueriesService: ContactUsQueriesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: ContactUsQuery })
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateContactUsQueryDto) {
    return await this.contactUsQueriesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: ContactUsQuery })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateContactUsQueryDto, @Param('id') id: number) {
    return await this.contactUsQueriesService.update(dto, id);
  }

  @Get()
  async findAll(@Query() query: QueryType) {
    return await this.contactUsQueriesService.findAll(query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: ContactUsQuery })
  async remove(@Param('id') id: number) {
    return await this.contactUsQueriesService.remove(id);
  }
}
