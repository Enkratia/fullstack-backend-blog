import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOneById(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async updateUser(@Body() body, @Param('id') id: number) {
    return await this.usersService.updateById(body, id);
  }
}
