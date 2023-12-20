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

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable({
    // name: 'posts_tags', // table name for the junction table of this relation
    joinColumn: {
      name: 'post_id',
      // referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      // referencedColumnName: 'tag',
    },
  })
  tags: Relation<Tag[]>;

  // @OneToMany(() => Tag, (tag) => tag.posts, {
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'tags_id' })
  // tags: Relation<Tag[]>;

  @Column({ default: false })
  isFeatured: boolean;

  // **
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  // @BeforeInsert()
  // beforeinsert() {
  //   console.log('beforeinsert');
  // }

  // @BeforeUpdate()
  // beforeupdate() {
  //   console.log('beforeupdate');
  // }

  // @AfterLoad()
  // afterLoad() {
  //   console.log('afterLoad');
  // }
}
