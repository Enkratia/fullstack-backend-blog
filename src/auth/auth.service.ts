import * as bcrypt from 'bcrypt';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  BadRequestException,
  GoneException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ForgetUserDto } from './dto/forget-user.dto';
import { MailerService } from '../_mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private mailerService: MailerService,
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

    throw new UnauthorizedException('Email or password are incorrect');
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

    if (!isExist) {
      throw new NotFoundException();
    }

    if (isExist.emailVerified) {
      throw new GoneException('Already activated');
    }

    const user = new User();
    user.emailVerified = true;

    return await this.dataSource.manager.update(User, { id: isExist.id }, user);
  }

  async checkEmail(body: ForgetUserDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const mailOptions = {
      recipients: [{ name: '', address: user.email }],
      subject: 'Password recovery',
      html: await this.mailerService.compileResetEmailTemplate({
        email: user.email,
      }),
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { message: 'email sent' };
  }

  async verifyReset(body: Record<'token', string>) {
    const res = await this.jwtService.verify(body.token);

    return { message: 'token verified' };
  }
}
