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

import { UsMissionService } from './us-mission.service';
import { CreateUsMissionDto } from './dto/create-us-mission.dto';
import { UpdateUsMissionDto } from './dto/update-us-mission.dto';

@Controller('us-mission')
export class UsMissionController {
  constructor(private readonly usMissionService: UsMissionService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // create(@Body() createUsMissionDto: CreateUsMissionDto) {
  //   return this.usMissionService.create(createUsMissionDto);
  // }

  @Get()
  findAll() {
    return this.usMissionService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsMissionDto: UpdateUsMissionDto) {
  //   return this.usMissionService.update(+id, updateUsMissionDto);
  // }
}
