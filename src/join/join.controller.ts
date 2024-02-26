import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Join } from './entities/join.entity';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreateJoinDto) {
  //   return await this.joinService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: Join })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdateJoinDto) {
    return await this.joinService.update(dto);
  }

  @Get()
  async findAll() {
    return await this.joinService.findAll();
  }
}
