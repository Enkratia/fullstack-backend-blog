import * as bcrypt from 'bcrypt';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    let isPasswordMatch = false;
    const user = await this.usersService.findByEmail(email);

    if (user) {
      isPasswordMatch = await bcrypt.compare(pass, user.password);
    }

    if (isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }

    throw new BadRequestException('Email or password are incorrect');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      user,
      backendTokens: await this.usersService.generateBackendTokens(payload),
    };
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      backendTokens: await this.usersService.generateBackendTokens(payload),
    };
  }

  async activateUser(body: Record<'token', string>) {
    const res = await this.jwtService.verify(body.token);

    const isExist = await this.usersService.findByEmail(res.email);
    if (!isExist) throw new BadRequestException('User not found');

    const user = new User();
    user.emailVerified = true;

    return await this.dataSource.manager.update(User, { id: isExist.id }, user);
  }
}
