import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JoinService } from './join.service';
import { CreateJoinDto } from './dto/create-join.dto';
import { UpdateJoinDto } from './dto/update-join.dto';

@Controller('join')
export class JoinController {
  constructor(private readonly joinService: JoinService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // create(@Body() createJoinDto: CreateJoinDto) {
  //   return this.joinService.create(createJoinDto);
  // }

  @Get()
  findAll() {
    return this.joinService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJoinDto: UpdateJoinDto) {
  //   return this.joinService.update(+id, updateJoinDto);
  // }
}
