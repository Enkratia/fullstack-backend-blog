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

  async findAll(query: QueryType) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.usersRepository.createQueryBuilder('u');
    qb.leftJoinAndSelect('u.userLinks', 'userLinks');

    // PAGINATION
    if (query._page) {
      const limit = query._limit ? +query._limit : 8;

      qb.take(limit);
      qb.skip((query._page - 1) * limit);

      delete query._page;
      delete query._limit;
    }

    // SORT (ORDER)
    if (query._sort) {
      const order = query._order?.toUpperCase() !== 'DESC' ? 'ASC' : 'DESC';
      qb.orderBy(`u.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    // Operators
    // NE
    for (let q in query) {
      if (!q.endsWith('_ne')) continue;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'u.' + q).slice(0, -3);
      const value = Array.isArray(query[q]) ? query[q] : [query[q]];

      keyMedium = `${key} NOT IN (:...${q})`;
      mediumValue[`${q}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // LTE
    for (let q in query) {
      if (!q.endsWith('_lte')) continue;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'u.' + q).slice(0, -4);
      const value = query[q];

      keyMedium = `${key} <= :${q}`;
      mediumValue[`${q}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // MTE
    for (let q in query) {
      if (!q.endsWith('_mte')) continue;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'u.' + q).slice(0, -4);
      const value = query[q];

      keyMedium = `${key} >= :${q}`;
      mediumValue[`${q}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // LIKE
    for (let q in query) {
      if (!q.endsWith('_like')) continue;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'u.' + q).slice(0, -5);
      const value = Array.isArray(query[q]) ? query[q] : [query[q]];

      keyMedium = `${key} ILIKE ANY(ARRAY[:...${q}])`;
      mediumValue[`${q}`] = value.map((v: any) => `%${v}%`);

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // EQUAL (Exact comparison)
    for (let q in query) {
      if (q.includes('_')) continue;

      let keyMedium = '';
      let mediumValue = {};

      const key = q.includes('.') ? q : 'u.' + q;
      const value = Array.isArray(query[q]) ? query[q] : [query[q]];

      keyMedium = `${key} IN (:...${q})`;
      mediumValue[`${q}`] = value;

      qb.andWhere(keyMedium, mediumValue);
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
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
