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

import { KnowMoreService } from './know-more.service';
import { CreateKnowMoreDto } from './dto/create-know-more.dto';
import { UpdateKnowMoreDto } from './dto/update-know-more.dto';

@Controller('know-more')
export class KnowMoreController {
  constructor(private readonly knowMoreService: KnowMoreService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createKnowMoreDto: CreateKnowMoreDto) {
    return this.knowMoreService.create(createKnowMoreDto);
  }

  @Get()
  findAll() {
    return this.knowMoreService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKnowMoreDto: UpdateKnowMoreDto) {
  //   return this.knowMoreService.update(+id, updateKnowMoreDto);
  // }
}
