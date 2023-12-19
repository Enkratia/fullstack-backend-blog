import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  content: string;

  @Column({ default: '' })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  tags: Relation<Tag[]>;

  @Column({ default: false })
  isFeatured: boolean;

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
