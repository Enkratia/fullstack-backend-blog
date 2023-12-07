import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
