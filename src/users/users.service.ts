import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { Request } from 'express';
import { ForbiddenError } from '@casl/ability';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLinks } from './entities/userLinks.entity';
import { UpdateUserDto } from './dto/update-user.dto';

import { MailerService } from '../_mailer/mailer.service';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { HelperService } from '../_utils/helper/helper.service';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly helperService: HelperService,
    private abilityFactory: AbilityFactory,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExist = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    console.log('isExist: ', isExist);

    if (isExist) throw new ConflictException('This email already exist');

    const mailOptions = {
      recipients: [{ name: '', address: createUserDto.email }],
      subject: 'Email Activation',
      html: await this.mailerService.compileEmailActivationTemplate({
        email: createUserDto.email,
      }),
    };

    try {
      const res = await this.mailerService.sendMail(mailOptions);
      console.log('res2', res);
    } catch (error) {
      console.log('error2', error);
      throw new BadRequestException(error);
    }

    const userLinks = new UserLinks();
    await this.usersRepository.save({
      fullname: createUserDto.fullname,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
      userLinks: userLinks,
      posts: [],
    });

    return { message: 'done' };
  }

  async findByEmailDangerously(email: string) {
    const qb = this.usersRepository
      .createQueryBuilder('u')
      .addSelect('u.email')
      .addSelect('u.password')
      .addSelect('u.emailVerified')
      .addSelect('u.createdAt')
      .addSelect('u.updatedAt')
      .where({ email });

    return await qb.getOne();
  }

  async findById(id: string, req: Request) {
    const userId = await this.helperService.getUserId(req);

    const qb = this.usersRepository.createQueryBuilder('u');
    qb.where({ id }).leftJoinAndSelect('u.userLinks', 'userLinks');

    if (id === userId) {
      qb.addSelect('u.email');
    }

    const user = await qb.getOne();
    if (!user) throw new BadRequestException('User not found');

    const { password, ...result } = user;
    return result;
  }

  async findAll(query: QueryType, req: Request) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.usersRepository.createQueryBuilder('u');
    qb.leftJoinAndSelect('u.userLinks', 'userLinks');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.where(
          `to_tsvector('english', u.fullname) @@ to_tsquery('english', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );
      }

      delete query._q;
    }

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

  async updateById(
    body: UpdateUserDto,
    imageUrl: string | null,
    id: string,
    req: Request,
  ) {
    const res = await this.usersRepository.findOne({
      where: { id },
      relations: {
        userLinks: true,
      },
    });

    if (!res) throw new NotFoundException('User not found');

    // **
    const ability = this.abilityFactory.defineAbility(req.user as User);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, res);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }

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
      { id: res.userLinks.id },
      userLinks,
    );

    if (!userLinksRes.affected) {
      throw new BadRequestException('Failed to update links');
    }

    return userLinksRes;
  }

  // Перенести в auth(?)
  async generateBackendTokens(payload: {
    email: string;
    id: string;
    isAdmin: boolean;
  }) {
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

  // Перенести в auth(?)
  async generateBackendAccessToken(payload: {
    email: string;
    id: string;
    isAdmin: boolean;
  }) {
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_KEY,
      }),
      expiresIn: Date.now() + +process.env.JWT_ACCESS_EXPIRE_TIME,
    };
  }
}

// ** create
// const payload = {
//   email: user.email,
//   id: user.id,
// };

// const { password, ...result } = user;

// return {
//   user: result,
//   backendTokens: await this.generateBackendTokens(payload),
// };

//
// return { data: [], totalCount: 0 };
// throw new BadRequestException();
