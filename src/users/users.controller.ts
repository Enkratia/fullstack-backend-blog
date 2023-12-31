import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOneById(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @Get()
  async getAllUsers(@Query() query: QueryType) {
    return await this.usersService.findAll(query);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async updateUser(
    @UploadedFile(SharpPipe)
    imageUrl: string | null,
    @Body() body: UpdateUserDto,
    @Param('id') id: number,
  ) {
    return await this.usersService.updateById(body, imageUrl, id);
  }
}
