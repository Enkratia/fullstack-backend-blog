import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Test } from './test.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  contentText: string;

  @Column()
  contentJson: string;

  @Column({ default: '' })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @Column('simple-array')
  tags: string[];

  @Column({ default: false })
  isFeatured: boolean;

  @OneToMany(() => Test, (test) => test.post)
  tests: Test[];

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
