import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Relation,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { UserLinks } from './userLinks.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  imageUrl: string;

  @Column({ default: '' })
  profession: string;

  @Column({ default: '' })
  company: string;

  @Column({ default: '' })
  representation: string;

  @Column({ default: false, select: false })
  emailVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => UserLinks, (userLinks) => userLinks.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'userLinks_id' })
  userLinks: Relation<UserLinks>;

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'posts_id' })
  posts: Relation<Post[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
