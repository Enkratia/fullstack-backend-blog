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

import { WhyThisBlogService } from './why-this-blog.service';
import { CreateWhyThisBlogDto } from './dto/create-why-this-blog.dto';
import { UpdateWhyThisBlogDto } from './dto/update-why-this-blog.dto';

@Controller('why-this-blog')
export class WhyThisBlogController {
  constructor(private readonly whyThisBlogService: WhyThisBlogService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createWhyThisBlogDto: CreateWhyThisBlogDto) {
    return this.whyThisBlogService.create(createWhyThisBlogDto);
  }

  @Get()
  findAll() {
    return this.whyThisBlogService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWhyThisBlogDto: UpdateWhyThisBlogDto) {
  //   return this.whyThisBlogService.update(+id, updateWhyThisBlogDto);
  // }
}
