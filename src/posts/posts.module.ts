import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { Test } from './entities/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Test])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
