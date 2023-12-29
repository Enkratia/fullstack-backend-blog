import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

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

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
