import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLinks } from './entities/userLinks.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const saltRounds = 10;

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
    const isExist = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (isExist) throw new BadRequestException('This email already exist');

    // const post = new Post();

    const userLinks = new UserLinks();
    const user = await this.usersRepository.save({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
      userLinks: userLinks,
      posts: [],
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
      relations: {
        userLinks: true,
      },
    });

    if (!user) throw new BadRequestException('Cannot find user');

    const { password, ...result } = user;
    return result;
  }

  async updateById(body: UpdateUserDto, imageUrl: string | null, id: number) {
    const res = await this.usersRepository.findOne({
      where: { id },
      relations: {
        userLinks: true,
      },
    });

    if (!res) throw new NotFoundException('Transaction not found');

    // **
    const user = new User();
    user.fullname = body.fullname;
    user.email = body.email;
    user.company = body.company;
    user.profession = body.profession;
    user.representation = body.representation;

    if (imageUrl) {
      user.imageUrl = imageUrl;
    }

    if (body.password) {
      user.password = await bcrypt.hash(body.password, saltRounds);
    }

    await this.dataSource.manager.update(User, { id }, user);

    // **
    const userLinks = new UserLinks();
    userLinks.facebook = body.facebook;
    userLinks.twitter = body.twitter;
    userLinks.instagram = body.instagram;
    userLinks.linkedin = body.linkedin;

    const userLinksRes = await this.dataSource.manager.update(
      UserLinks,
      res.userLinks.id,
      userLinks,
    );

    return userLinksRes;
  }

  // Перенести в auth(?)
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
      expiresIn: Date.now() + +process.env.JWT_ACCESS_EXPIRE_TIME,
      refreshExpiresIn: Date.now() + +process.env.JWT_REFRESH_EXPIRE_TIME,
    };
  }
}

// EXAMPLE datasource
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
