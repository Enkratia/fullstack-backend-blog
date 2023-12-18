import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Tag } from './entities/tag.entity';

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

    const post = new Post();
    post.title = createPostDto.title;
    post.category = createPostDto.category;
    post.content = createPostDto.content;

    const tags = createPostDto.tags.split(',').map((tag) => {
      const tagEntity = new Tag();
      tagEntity.tag = tag.trim();
      return tagEntity;
    });

    post.tags = tags;

    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    const postRes = await this.postRepository.save(post);
    user.posts.push(postRes);
    const userRes = await this.userRepository.save(user);

    return userRes;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    imageUrl: string | null,
  ) {
    // const post = await this.postRepository.findOne({
    //   where: { id },
    //   relations: {
    //     user: true,
    //   },
    // });

    // if (!post) throw new BadRequestException();

    // post.title = updatePostDto.title;
    // post.category = updatePostDto.category;
    // post.content = updatePostDto.content;

    const post = new Post();
    post.title = updatePostDto.title;
    post.category = updatePostDto.category;
    post.content = updatePostDto.content;

    const tags = updatePostDto.tags.split(',').map((tag) => {
      const tagEntity = new Tag();
      tagEntity.tag = tag.trim();
      return tagEntity;
    });

    post.tags = tags;

    if (imageUrl) {
      post.imageUrl = imageUrl;
    }

    await this.dataSource.manager.update(Post, { id }, post);

    // const user = await this.userRepository.findOne({
    //   where: { id: post.user.id },
    //   relations: { posts: true },
    // });

    // const postRes = await this.postRepository.save(post);
    // user.posts.push(postRes);
    // const userRes = await this.userRepository.save(user);

    // return userRes;
  }

  // findAll() {
  //   return `This action returns all posts`;
  // }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        user: true,
        tags: true,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
