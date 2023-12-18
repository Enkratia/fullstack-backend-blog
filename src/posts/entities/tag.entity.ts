import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Relation<Post[]>;
}
