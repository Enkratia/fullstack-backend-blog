import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Relation,
} from 'typeorm';

import { User } from './user.entity';

@Entity()
export class UserLinks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  facebook: string;

  @Column({ default: '' })
  twitter: string;

  @Column({ default: '' })
  instagram: string;

  @Column({ default: '' })
  linkedin: string;

  @OneToOne(() => User, (user) => user.userLinks)
  user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
