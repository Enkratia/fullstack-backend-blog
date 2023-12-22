import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

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
    // @InjectDataSource() private dataSource: DataSource,
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
    // console.log(query);

    const qb = this.postRepository.createQueryBuilder('p');

    qb.leftJoinAndSelect('p.user', 'user');

    // qb.limit(dto.limit || 0);
    // qb.take(dto.take || 10);

    // const names = [{ id: 5 }, { title: 'title' }, { isFeautured: false }];

    // Operators

    const oRaw = {};

    for (let key in query) {
      if (key.match(/_(lt|gt|lik|n)e$/)) {
        oRaw[key] = query[key];
      }
    }

    // Filters (+SQLI defence)
    // const fRaw = {};

    // for (let key in query) {
    //   if (key.startsWith('_')) continue;
    //   fRaw[key] = query[key];
    // }

    // const f = Object.entries(fRaw);

    // for (let i = 0; i < f.length; i++) {
    //   let keyMedium = '';
    //   let mediumValue = {};

    //   const key = 'p.' + f[i][0];
    //   const value = f[i][1];

    //   keyMedium = `${key} = :${key + i}`;
    //   mediumValue[`${key + i}`] = value;

    //   qb.andWhere(keyMedium, mediumValue);
    // }

    // const posts = await qb.getMany();
    // return posts;
  }
}
