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
import { CreateUserDto } from './dto/create-user.dto';
import { UserLinks } from './entities/userLinks.entity';
import { UpdateUserDto } from './dto/update-user.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserLinks)
    private userLinksRepository: Repository<UserLinks>,
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

  async updateById(body: UpdateUserDto, imageUrl: string | null, id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('Transaction not found');

    // const { userLinks, ...rest } = body;

    // if (rest.password) {
    //   rest.password = await bcrypt.hash(rest.password, saltRounds);
    // }

    // **************************

    // const userData = {
    //   fullname: body.fullname,
    //   email: body.email,
    //   company: body.company,
    //   profession: body.profession,
    //   representation: body.representation,
    //   imageUrl: imageUrl,
    //   password: body.password,
    // };

    // userData.password ?? delete userData.password;
    // userData.imageUrl ?? delete userData.imageUrl;

    // const userRes = await this.usersRepository.update({ id }, userData);

    const test = new User();
    test.fullname = body.fullname;
    test.email = body.email;
    test.password = await bcrypt.hash(body.password, saltRounds);

    // const userLinksRes = await this.userLinksRepository.update(
    //   {
    //     id: user.userLinks.id,
    //   },
    //   userLinks,
    // );

    // return userLinksRes;
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
      expiresIn: new Date().setTime(
        new Date().getTime() + +process.env.JWT_ACCESS_EXPIRE_TIME,
      ),
      refreshExpiresIn: new Date().setTime(
        new Date().getTime() + +process.env.JWT_REFRESH_EXPIRE_TIME,
      ),
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
