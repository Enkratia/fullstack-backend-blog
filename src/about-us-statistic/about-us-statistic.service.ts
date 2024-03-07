import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AboutUsStatisticService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const data = [
      {
        type: 'Blogs Published',
        count: 0,
      },
      {
        type: 'Views on Finsweet',
        count: 0,
      },
      {
        type: 'Total active users',
        count: 0,
      },
    ];

    data[0].count = await this.postRepository.count();
    data[1].count = await this.postRepository.sum('views');
    data[2].count = await this.userRepository.count();
    return data;
  }
}
