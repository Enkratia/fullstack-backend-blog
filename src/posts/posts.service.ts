import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Test } from './entities/test.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Test) private testRepository: Repository<Test>,
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
    post.tags = createPostDto.tags.split(',').map((tag) => tag.trim());
    post.imageUrl = imageUrl;

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
    post.tags = updatePostDto.tags.split(',').map((tag) => tag.trim());

    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    // УДАЛИТЬ
    const testEntities = updatePostDto.tests.split(',').map((el) => {
      const a = new Test();
      a.content = el.trim();
      return a;
    });
    const testRes = await this.testRepository.save(testEntities);
    console.log(testRes);
    post.tests = testEntities;
    // ***********************

    if (typeof updatePostDto.isFeatured === 'boolean') {
      post.isFeatured = updatePostDto.isFeatured;
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

  async findMany(query: QueryType) {
    const limit = 3;
    const page = 2;

    const result = { data: [], totalCount: 0 };

    const contentResult = await this.testRepository
      .createQueryBuilder('test')
      .select('DISTINCT (test.content) as content')
      .take(limit)
      .skip((page - 1) * limit)
      .getRawMany();

    contentResult.forEach((obj) => {
      result.data.push(obj.content);
    });

    const countResult = await this.testRepository
      .createQueryBuilder('tests')
      .select('COUNT(DISTINCT(tests.content)) as totalCount')
      .getRawMany();

    result.totalCount = countResult[0].totalCount;

    return result;

    // .createQueryBuilder('test')
    // .query(`SELECT COUNT(DISTINCT test.id) as test_id`);
    // .groupBy('tests.content')
    // .getMany();
    // .select('test.content')
    // .groupBy('test.content')
    // .distinctOn(['test.content'])
    // .distinct(true)
    // .getCount();

    // test.select('test.content');
    // test.distinct();
    // test.select('DISTINCT (test.content)');
    // test
    // const result = await test.getManyAndCount();
    // const result = await test

    // const result = this.postRepository
    //   .createQueryBuilder('post')
    //   .leftJoin('post.tests', 'tests')
    //   .select('post.tests AS tests')
    //   .addSelect('COUNT(*) AS count')
    //   .groupBy('post.tests')
    //   .getRawMany();

    // const result = await this.testRepository
    //   .createQueryBuilder('test')
    //   .select('test.content AS test_count')
    //   .addSelect('COUNT(*) AS count')
    //   // .orderBy('test.content')
    //   // .groupBy('test.content')
    //   // .where({ uploaderId: In ([1,2,3,4]) })
    //   .distinctOn(['test.content'])
    //   // .orderBy({ 'test.content': 'DESC' })
    //   // .orderBy({ 'test.uploaderId': 'ASC', 'test.createdAt': 'DESC' })
    //   // .getManyAndCount();
    //   .getMany();

    // let results = await this.repository.createQueryBuilder('product')
    // .select("product.releaseDate AS release_date")
    // .addSelect("COUNT(*) AS count")
    // .groupBy("product.releaseDate")
    // .getRawMany();

    // const test = this.postRepository.createQueryBuilder('test');
    // test.leftJoin('test.tests', 'tests');

    // test.distinctOn(['content']);
    // test.select('(tests.content)');
    // test.where('tests distinct on tests.content');
    // test.getCount();
    // const result = await test.getManyAndCount();
    // const result = await test.getManyAndCount();

    // return result;

    // let keyMedium = '';
    // let mediumValue = {};

    // keyMedium = `test.tags DISTINCT ANY(ARRAY[:...tag111])`;
    // mediumValue['tag111'] = value.map((v: any) => `%${v}%`);

    // test.andWhere(keyMedium, mediumValue);
    // // test.distinct(true);
    // test.

    // test.innerJoin("test.tags")

    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

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

      let keyMedium = '';
      let mediumValue = {};

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -3);
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

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -4);
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

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -4);
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

      const key = (q.includes('.') ? q : 'p.' + q).slice(0, -5);
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

      const key = q.includes('.') ? q : 'p.' + q;
      const value = Array.isArray(query[q]) ? query[q] : [query[q]];

      keyMedium = `${key} IN (:...${q})`;
      mediumValue[`${q}`] = value;

      qb.andWhere(keyMedium, mediumValue);
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
  }
}

// =================
// .replace(/[^а-яА-ЯёЁ0-9]/g, ' ') // RU lang
// to_tsquery('simple', :formattedSearch) // 'simple' as an option
// const formattedSearch = query._q.trim().replace(/ /g, ' & '); // one of the examples how to format search query
// const formattedSearchPre = query._q.replace(/[^\p{L}\p{N}]/giu, ' ');

// _equal_all / _like_all ?
