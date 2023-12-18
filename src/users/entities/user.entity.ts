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
  JoinTable,
} from 'typeorm';

import { UserLinks } from './userLinks.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  imageUrl: string;

  // **
  @Column({ default: '' })
  profession: string;

  @Column({ default: '' })
  company: string;

  @Column({ default: '' })
  representation: string;

  // **
  @OneToOne(() => UserLinks, (userLinks) => userLinks.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'userLinks_id' })
  userLinks: Relation<UserLinks>;

  // **
  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'posts_id' })
  posts: Relation<Post[]>;

  // **
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
