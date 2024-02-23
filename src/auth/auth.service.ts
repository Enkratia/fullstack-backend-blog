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
import { ForgotAuthDto } from './dto/forgot-auth.dto';
import { MailerService } from '../_mailer/mailer.service';
import { ResetAuthDto } from './dto/reset-auth.dto';

const saltRounds = 10;

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
      backendTokens:
        await this.usersService.generateBackendAccessToken(payload),
    };
  }

  async activateUser(query: QueryType) {
    const payload = await this.jwtService.verify(query.token);

    const isExist = await this.usersService.findByEmail(payload.email);

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

  async checkEmail(body: ForgotAuthDto) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException();
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

  async verifyReset(query: QueryType) {
    const { email, expiresIn } = await this.jwtService.verify(query.token);

    if (!email) {
      throw new BadRequestException();
    }

    if (Date.now() > expiresIn) {
      throw new GoneException();
    }

    return { email };
  }

  async resetPassword(body: ResetAuthDto, query: QueryType) {
    const { email } = await this.verifyReset(query);

    if (!email) {
      throw new BadRequestException();
    }

    const user = new User();
    user.password = await bcrypt.hash(body.password, saltRounds);

    const res = await this.dataSource.manager.update(User, { email }, user);
    if (!res.affected) throw new BadRequestException();

    return res;
  }
}
