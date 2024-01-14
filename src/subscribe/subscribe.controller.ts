import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async create(@Body() dto: CreateSubscribeDto) {
    return await this.subscribeService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.subscribeService.findAll();
  }

  @Delete()
  async unsubscribeEmail(@Body() body: Record<'token', string>) {
    return await this.subscribeService.unsubscribeEmail(body);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subscribeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubscribeDto: UpdateSubscribeDto) {
  //   return this.subscribeService.update(+id, updateSubscribeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscribeService.remove(+id);
  // }
}
