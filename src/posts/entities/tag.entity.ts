// import {
//   BeforeInsert,
//   Column,
//   Entity,
//   JoinTable,
//   ManyToMany,
//   ManyToOne,
//   PrimaryColumn,
//   PrimaryGeneratedColumn,
//   Relation,
// } from 'typeorm';

// import { Post } from './post.entity';

// @Entity()
// export class Tag {
// @PrimaryGeneratedColumn()
// id: number;

// @PrimaryColumn()
// tag: string;

// @ManyToMany(() => Post, (post) => post.tags, {
//   orphanedRowAction: 'delete',
// })
// posts: Relation<Post[]>;

// @ManyToOne(() => Post, (post) => post.tags, {
//   orphanedRowAction: 'delete',
// })
// posts: Relation<Post>;
// }
