import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;

    const isExist = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (isExist) throw new BadRequestException('This email already exist');

    const user = await this.usersRepository.save({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
    });

    // const token = this.jwtService.sign({
    //   email: createUserDto.email,
    //   id: user.id,
    // });

    const payload = {
      email: user.email,
      id: user.id,
    };

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
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findAll() {
    return [];
  }
}
