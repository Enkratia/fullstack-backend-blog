import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { WhyWeStartedService } from './why-we-started.service';
import { CreateWhyWeStartedDto } from './dto/create-why-we-started.dto';
import { UpdateWhyWeStartedDto } from './dto/update-why-we-started.dto';

@Controller('why-we-started')
export class WhyWeStartedController {
  constructor(private readonly whyWeStartedService: WhyWeStartedService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createWhyWeStartedDto: CreateWhyWeStartedDto) {
    return this.whyWeStartedService.create(createWhyWeStartedDto);
  }

  @Get()
  findAll() {
    return this.whyWeStartedService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWhyWeStartedDto: UpdateWhyWeStartedDto) {
  //   return this.whyWeStartedService.update(+id, updateWhyWeStartedDto);
  // }
}
