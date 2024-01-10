import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { NoFilesInterceptor } from '@nestjs/platform-express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(NoFilesInterceptor())
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('activate')
  async activateUser(@Body() body: Record<'token', string>) {
    return await this.authService.activateUser(body);
  }

  // Для теста
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getProfile(@Req() req) {
  //   return req.user;
  // }
}
