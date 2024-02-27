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

import { PrivacyPolicyService } from './privacy-policy.service';
import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AbilitiesGuard } from '../ability/abilities.guard';
import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  // @Post()
  // @UseInterceptors(NoFilesInterceptor())
  // async create(@Body() dto: CreatePrivacyPolicyDto) {
  //   return await this.privacyPolicyService.create(dto);
  // }

  @Patch()
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Update, subject: PrivacyPolicy })
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() dto: UpdatePrivacyPolicyDto) {
    return await this.privacyPolicyService.update(dto);
  }

  @Get()
  async findOne() {
    return await this.privacyPolicyService.findOne();
  }
}
