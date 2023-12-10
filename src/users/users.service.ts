import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLinks } from './entities/userLinks.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    // @InjectRepository(UserLinks)
    // private userLinksRepository: Repository<UserLinks>,
    @InjectDataSource() private dataSource: DataSource,
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

    const userLinks = new UserLinks();
    const user = await this.usersRepository.save({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
      userLinks: userLinks,
    });

    const payload = {
      email: user.email,
      id: user.id,
    };

    const { password, ...result } = user;

    return {
      user: result,
      backendTokens: await this.generateBackendTokens(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new BadRequestException('Cannot find user');

    const { password, ...result } = user;
    return result;
  }

  async updateById(id: number) {
    // const res = this.usersRepository.update({
    //   where: {
    //     id
    //   }
    // })
  }

  // Передислоцировать в auth(?)
  async generateBackendTokens(payload: { email: string; id: number }) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
      expiresIn: new Date().setTime(
        new Date().getTime() + +process.env.JWT_ACCESS_EXPIRE_TIME,
      ),
      refreshExpiresIn: new Date().setTime(
        new Date().getTime() + +process.env.JWT_REFRESH_EXPIRE_TIME,
      ),
    };
  }
}

// EXAMPLE
// async create(createUserDto: CreateUserDto) {
//   const result = this.dataSource.manager.transaction(
//     async (entityManager: EntityManager) => {
//       const saltRounds = 10;

//       const isExist = await this.usersRepository.findOne({
//         where: {
//           email: createUserDto.email,
//         },
//       });

//       if (isExist) throw new BadRequestException('This email already exist');

//       // **
//       const userLinks = new UserLinks();

//       const user = new User();
//       user.fullname = createUserDto.fullname;
//       user.email = createUserDto.email;
//       user.password = await bcrypt.hash(createUserDto.password, saltRounds);
//       user.userLinks = userLinks;

//       const res = await entityManager.save(user);

//       const payload = {
//         email: res.email,
//         id: res.id,
//       };

//       const { password, ...result } = res;

//       return {
//         user: result,
//         backendTokens: await this.generateBackendTokens(payload),
//       };
//     },
//   );

//   return result;
// }
