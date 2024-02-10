import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Query,
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

  @Get('count')
  async getCount() {
    return await this.subscribeService.getCount();
  }

  @Get()
  async findAll() {
    return await this.subscribeService.findAll();
  }

  @Delete()
  async unsubscribeEmail(@Query() query: QueryType) {
    return await this.subscribeService.unsubscribeEmail(query);
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
