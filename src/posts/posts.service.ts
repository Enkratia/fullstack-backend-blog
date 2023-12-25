import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
    post.contentJson = createPostDto.contentJson;
    post.contentText = createPostDto.contentText;
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
    post.contentJson = updatePostDto.contentJson;
    post.contentText = updatePostDto.contentText;
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
    let idx = 0;

    const qb = this.postRepository.createQueryBuilder('p');
    qb.leftJoinAndSelect('p.user', 'user');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.orWhere(
          `to_tsvector('english', p.category) @@ to_tsquery('english', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );

        qb.orWhere(
          `to_tsvector('english', p.title) @@ to_tsquery('english', :formattedSearch)`,
          {
            formattedSearch: `${formattedSearch}:*`,
          },
        );

        qb.orWhere(
          `to_tsvector('english', p.tags) @@ to_tsquery('english', :formattedSearch)`,
          {
            formattedSearch: `${formattedSearch}:*`,
          },
        );

        qb.orWhere(
          `to_tsvector('english', p.contentText) @@ to_tsquery('english', :formattedSearch)`,
          {
            formattedSearch: `${formattedSearch}:*`,
          },
        );

        qb.orWhere(
          `to_tsvector('english', user.fullname) @@ to_tsquery('english', :formattedSearch)`,
          {
            formattedSearch: `${formattedSearch}:*`,
          },
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
      qb.orderBy(`p.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    // Operators
    // NE
    for (let q in query) {
      if (!q.endsWith('_ne')) continue;
      idx++;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -3);
      const value = query[q];

      keyMedium = `${key} != :${key + idx}`;
      mediumValue[`${key + idx}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // LTE
    for (let q in query) {
      if (!q.endsWith('_lte')) continue;
      idx++;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -4);
      const value = query[q];

      keyMedium = `${key} <= :${key + idx}`;
      mediumValue[`${key + idx}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // MTE
    for (let q in query) {
      if (!q.endsWith('_mte')) continue;
      idx++;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -4);
      const value = query[q];

      keyMedium = `${key} >= :${key + idx}`;
      mediumValue[`${key + idx}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // LIKE
    for (let q in query) {
      if (!q.endsWith('_like')) continue;
      idx++;

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -5);
      const value = query[q];

      keyMedium = `${key} like :${key + idx}`;
      mediumValue[`${key + idx}`] = `%${value}%`;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    // Filter
    for (let q in query) {
      if (q.includes('_')) continue;
      idx++;

      let keyMedium = '';
      let mediumValue = {};

      const key = q.includes('.') ? q : 'p.' + q;
      const value = query[q];

      keyMedium = `${key} = :${key + idx}`;
      mediumValue[`${key + idx}`] = value;

      qb.andWhere(keyMedium, mediumValue);
      delete query[key];
    }

    const [data, count] = await qb.getManyAndCount();
    return { data, count };
  }

  // async findMany4(query) {
  //   const where = {};

  //   const nestizy = (line: string, likeValue: FindOperator<any>) => {
  //     const segments = line.split('.');
  //     const maxIdx = segments.length - 1;

  //     const core = {};
  //     core[segments[maxIdx]] = likeValue;

  //     const result = segments
  //       .slice(1, maxIdx)
  //       .reverse()
  //       .reduce((prev, next) => {
  //         const obj = {};
  //         obj[next] = prev;
  //         return obj;
  //       }, core);

  //     where[segments[0]] = result;
  //   };

  //   // OPERATORS
  //   // LTE
  //   for (let key in query) {
  //     if (!key.endsWith('_lte')) continue;

  //     const lteKey = key.slice(0, -4);
  //     const lteValue = LessThanOrEqual(query[key]);

  //     if (key.includes('.')) {
  //       nestizy(lteKey, lteValue);
  //     } else {
  //       where[lteKey] = lteValue;
  //     }

  //     delete query[key];
  //   }

  //   // MTE
  //   for (let key in query) {
  //     if (!key.endsWith('_mte')) continue;

  //     const mteKey = key.slice(0, -4);
  //     const mteValue = MoreThanOrEqual(query[key]);

  //     if (key.includes('.')) {
  //       nestizy(mteKey, mteValue);
  //     } else {
  //       where[mteKey] = mteValue;
  //     }

  //     delete query[key];
  //   }

  //   // NE
  //   for (let key in query) {
  //     if (!key.endsWith('_ne')) continue;

  //     const neKey = key.slice(0, -3);
  //     const neValue = Not(query[key]);

  //     if (key.includes('.')) {
  //       nestizy(neKey, neValue);
  //     } else {
  //       where[neKey] = neValue;
  //     }

  //     delete query[key];
  //   }

  //   // RELATION
  //   // const relations = {
  //   //   user: true,
  //   // };

  //   // const test = 'lementu';
  //   // const formattedQuery = test.trim().replace(/ /g, ' & ');
  //   // const test2 = {
  //   //   "to_tsvector('simple')": 'post.content',
  //   //   "to_tsquery('simple')": `${formattedQuery}:*`,
  //   // };

  //   const res = await this.postRepository.find({
  //     where,
  //   });

  //   // const test = 'lementu';
  //   // const formattedQuery = test.trim().replace(/ /g, ' & ');

  //   // const res = this.dataSource
  //   //   .createQueryBuilder()
  //   //   .select('post')
  //   //   .from(Post, 'post')
  //   //   .where(
  //   //     `to_tsvector('simple', post.content) @@ to_tsquery('simple', :formattedQuery)`,
  //   //     { formattedQuery: `${formattedQuery}:*` },
  //   //   )
  //   //   .getMany();

  //   //   const res = this.dataSource
  //   //     .createQueryBuilder()
  //   //     .select('post')
  //   //     .from(Post, 'post')
  //   //     .where(`post.user.fullname = :gh`, { gh: 'John Doe' })
  //   //     .getMany();

  //   //   return res;
  //   // }
  // }
}

// =================
// .replace(/[^а-яА-ЯёЁ0-9]/g, ' ') // RU lang
// to_tsquery('simple', :formattedSearch) // 'simple' as an option
// const formattedSearch = query._q.trim().replace(/ /g, ' & '); // one of the examples how to format search query
// const formattedSearchPre = query._q.replace(/[^\p{L}\p{N}]/giu, ' ');

// const lte = [];

// for (let key in query) {
//   if (!key.endsWith('_lte')) continue;
//   lte.push([key.slice(0, -4), query[key]]);

//   delete query[key];
// }
// for (let i = 0; i < lte.length; i++) {
//   let keyMedium = '';
//   let mediumValue = {};

//   const key = lte[i][0].includes('.') ? lte[i][0] : 'p.' + lte[i][0];
//   const value = lte[i][1];

//   keyMedium = `${key} <= :${key + i}`;
//   mediumValue[`${key + i}`] = value;

//   qb.andWhere(keyMedium, mediumValue);
// }

// const mte = [];

// for (let key in query) {
//   if (!key.endsWith('_mte')) continue;
//   mte.push([key.slice(0, -4), query[key]]);

//   delete query[key];
// }
// for (let i = 0; i < mte.length; i++) {
//   let keyMedium = '';
//   let mediumValue = {};

//   const key = mte[i][0].includes('.') ? mte[i][0] : 'p.' + mte[i][0];
//   const value = mte[i][1];

//   keyMedium = `${key} >= :${key + i}`;
//   mediumValue[`${key + i}`] = value;

//   qb.andWhere(keyMedium, mediumValue);
// }

// const like = [];
// for (let key in query) {
//   if (!key.endsWith('_like')) continue;
//   like.push([key.slice(0, -5), query[key]]);

//   delete query[key];
// }
// for (let i = 0; i < like.length; i++) {
//   let keyMedium = '';
//   let mediumValue = {};

//   const key = like[i][0].includes('.') ? like[i][0] : 'p.' + like[i][0];
//   const value = like[i][1];

//   keyMedium = `${key} like :${key + i}`;
//   mediumValue[`${key + i}`] = `%${value}%`;

//   qb.andWhere(keyMedium, mediumValue);
// }

// Filter
// const f = [];

// for (let key in query) {
//   if (key.includes('_')) continue;
//   f.push([key, query[key]]);

//   console.log([key, query[key]]);
// }
// for (let i = 0; i < f.length; i++) {
//   let keyMedium = '';
//   let mediumValue = {};

//   const key = f[i][0].includes('.') ? f[i][0] : 'p.' + f[i][0];
//   const value = f[i][1];

//   keyMedium = `${key} = :${key + i}`;
//   mediumValue[`${key + i}`] = value;

//   qb.andWhere(keyMedium, mediumValue);
// }
