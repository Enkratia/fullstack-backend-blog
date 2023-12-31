import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Relation,
  ValueTransformer,
} from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.tests, {
    orphanedRowAction: 'delete',
  })
  post: Relation<Post>;
}

// export default class ColumnBooleanTransformer implements ValueTransformer {
// public from(value?: string | null): boolean | undefined {
//   return Boolean(Number(value));
// }

// public to(value?: boolean | null): string | undefined {
//   return value ? '1' : '0';
// }
//   public from(value: any) {
//     console.log(value);
//     return value + 15;
//   }

//   public to(value: any) {
//     return value;
//   }
// }