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
    // const user = await this.userRepository.findOne({
    //   where: { id },
    //   relations: { posts: true },
    // });

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

    return await this.postRepository.save(post);
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

    // if (imageUrl) {
    //   post.imageUrl = imageUrl;
    // }

    const tags = updatePostDto.tags.split(',').map((tag) => {
      const tagEntity = new Tag();
      tagEntity.tag = tag.trim();
      return tagEntity;
    });

    const oldTags = await this.dataSource
      .createQueryBuilder()
      .relation(Post, 'tags')
      .of(id)
      .loadMany();

    const test = await this.dataSource.manager.save(Tag, tags);
    post.tags = test;

    const res = await this.dataSource.manager.save(post);

    const removedOldTags = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Tag)
      .where('tag.tag_id = :postId', { postId: null })
      .execute();

    return res;

    // const test = await this.dataSource
    //   .getRepository(Tag)
    //   .createQueryBuilder()
    //   .select('tag')
    //   .distinct(true)
    //   .getMany();

    // console.log(test);
  }

  // findAll() {
  //   return `This action returns all posts`;
  // }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        // user: true,
        tags: true,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
