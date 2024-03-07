import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: Relation<User>;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Tag, (tags) => tags.post, {
    cascade: true,
  })
  tags: Tag[];

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
