import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.tags, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  post: Relation<Post>;

  // **
  constructor(content: string) {
    this.content = content;
  }
}
