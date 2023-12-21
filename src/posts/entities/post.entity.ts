import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
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
  content: string;

  @Column({ default: '' })
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @Column()
  tags: string;

  @Column({ default: false })
  isFeatured: boolean;

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

// @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
// @JoinTable({
//   joinColumn: {
//     name: 'post_id',
//   },
//   inverseJoinColumn: {
//     name: 'tag_id',
//   },
// })
// tags: Relation<Tag[]>;
