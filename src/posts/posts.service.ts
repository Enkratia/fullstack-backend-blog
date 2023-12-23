import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOperator,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
// import { Tag } from './entities/tag.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    id: number,
    imageUrl: string | null,
  ) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { posts: true },
    });

    if (!user) throw new BadRequestException();

    const post = new Post();
    post.title = createPostDto.title;
    post.category = createPostDto.category;
    post.content = createPostDto.content;
    post.tags = createPostDto.tags;

    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    const postRes = await this.postRepository.save(post);
    user.posts.push(postRes);
    const userRes = await this.userRepository.save(user);

    return postRes;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    imageUrl: string | null,
  ) {
    const post = new Post();
    post.id = id;
    post.title = updatePostDto.title;
    post.category = updatePostDto.category;
    post.content = updatePostDto.content;
    post.tags = updatePostDto.tags;

    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    return await this.postRepository.save(post);
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
  }

  async findMany(query) {
    const qb = this.postRepository.createQueryBuilder('b');
    qb.leftJoinAndSelect('b.user', 'user');
    // qb.leftJoinAndSelect('b.user.userLinks', 'userLinks');

    console.log(query);
    for (let key in query) {
      if (key.includes('.')) {
        const d = key.split('.').pop();
        console.log(d);
      }
    }

    // Operators
    const lteRaw = {};

    for (let key in query) {
      if (!key.endsWith('_lte')) return;

      lteRaw[key] = query[key];
      delete query[key];
    }

    const lte = Object.entries(lteRaw);

    // Filters (+SQLI protection)
    const fRaw = {};

    for (let key in query) {
      if (key.startsWith('_')) continue;
      fRaw[key] = query[key];
    }

    const f = Object.entries(fRaw);

    for (let i = 0; i < f.length; i++) {
      let keyMedium = '';
      let mediumValue = {};

      const key = f[i][0].includes('.') ? f[i][0] : 'b.' + f[i][0];
      const value = f[i][1];

      keyMedium = `${key} = :${key + i}`;
      mediumValue[`${key + i}`] = value;

      qb.andWhere(keyMedium, mediumValue);
    }

    const posts = await qb.getMany();
    return posts;
  }

  async findMany4(query) {
    const where = {};

    const nestizy = (line: string, likeValue: FindOperator<any>) => {
      const segments = line.split('.');
      const maxIdx = segments.length - 1;

      const core = {};
      core[segments[maxIdx]] = likeValue;

      const result = segments
        .slice(1, maxIdx)
        .reverse()
        .reduce((prev, next) => {
          const obj = {};
          obj[next] = prev;
          return obj;
        }, core);

      where[segments[0]] = result;
    };

    // OPERATORS
    // LIKE
    for (let key in query) {
      if (!key.endsWith('_like')) continue;

      const likeKey = key.slice(0, -5);
      const likeValue = Like(`%${query[key]}%`);

      if (key.includes('.')) {
        nestizy(likeKey, likeValue);
      } else {
        where[likeKey] = likeValue;
      }

      delete query[key];
    }

    // LTE
    for (let key in query) {
      if (!key.endsWith('_lte')) continue;

      const lteKey = key.slice(0, -4);
      const lteValue = LessThanOrEqual(query[key]);

      if (key.includes('.')) {
        nestizy(lteKey, lteValue);
      } else {
        where[lteKey] = lteValue;
      }

      delete query[key];
    }

    // MTE
    for (let key in query) {
      if (!key.endsWith('_mte')) continue;

      const mteKey = key.slice(0, -4);
      const mteValue = MoreThanOrEqual(query[key]);

      if (key.includes('.')) {
        nestizy(mteKey, mteValue);
      } else {
        where[mteKey] = mteValue;
      }

      delete query[key];
    }

    // NE
    for (let key in query) {
      if (!key.endsWith('_ne')) continue;

      const neKey = key.slice(0, -3);
      const neValue = Not(query[key]);

      if (key.includes('.')) {
        nestizy(neKey, neValue);
      } else {
        where[neKey] = neValue;
      }

      delete query[key];
    }

    // RELATION
    // const relations = {
    //   user: true,
    // };

    // const test = 'lementu';
    // const formattedQuery = test.trim().replace(/ /g, ' & ');
    // const test2 = {
    //   "to_tsvector('simple')": 'post.content',
    //   "to_tsquery('simple')": `${formattedQuery}:*`,
    // };

    const res = await this.postRepository.find({
      where,
    });

    // const test = 'lementu';
    // const formattedQuery = test.trim().replace(/ /g, ' & ');

    // const res = this.dataSource
    //   .createQueryBuilder()
    //   .select('post')
    //   .from(Post, 'post')
    //   .where(
    //     `to_tsvector('simple', post.content) @@ to_tsquery('simple', :formattedQuery)`,
    //     { formattedQuery: `${formattedQuery}:*` },
    //   )
    //   .getMany();

    //   const res = this.dataSource
    //     .createQueryBuilder()
    //     .select('post')
    //     .from(Post, 'post')
    //     .where(`post.user.fullname = :gh`, { gh: 'John Doe' })
    //     .getMany();

    //   return res;
    // }
  }
}
