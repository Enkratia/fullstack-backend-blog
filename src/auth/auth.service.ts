import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

// const ACCESS_EXPIRE_TIME = 10 * 1000;
// const REFRESH_EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
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
    const payload = { email: user.email, id: user.id };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: `${process.env.JWT_ACCESS_EXPIRE_TIME}ms`,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: `${process.env.JWT_REFRESH_EXPIRE_TIME}ms`,
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(
          new Date().getTime() + +process.env.JWT_ACCESS_EXPIRE_TIME,
        ),
        refreshExpiresIn: new Date().setTime(
          new Date().getTime() + +process.env.JWT_REFRESH_EXPIRE_TIME,
        ),
      },
    };

    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      id: user.id,
    };

    return {
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: `${process.env.JWT_ACCESS_EXPIRE_TIME}ms`,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: `${process.env.JWT_REFRESH_EXPIRE_TIME}ms`,
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(
          new Date().getTime() + +process.env.JWT_ACCESS_EXPIRE_TIME,
        ),
        refreshExpiresIn: new Date().setTime(
          new Date().getTime() + +process.env.JWT_REFRESH_EXPIRE_TIME,
        ),
      },
    };
  }
}
