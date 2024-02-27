import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Subscribe } from './entities/subscribe.entity';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateSubscribeDto) {
    return await this.subscribeService.create(dto);
  }

  @Get('count')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subscribe })
  async getCount() {
    return await this.subscribeService.getCount();
  }

  @Get()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: Subscribe })
  async findAll() {
    return await this.subscribeService.findAll();
  }

  @Delete()
  async unsubscribeEmail(@Query() query: QueryType) {
    return await this.subscribeService.unsubscribeEmail(query);
  }
}
