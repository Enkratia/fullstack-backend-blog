import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';

import { UserLinks } from './userLinks.entity';

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

  // **
  @Column({ default: '' })
  profession: string;

  @Column({ default: '' })
  company: string;

  @Column({ default: '' })
  representation: string;

  @OneToOne(() => UserLinks, (userLinks) => userLinks.user)
  @JoinColumn({ name: 'userLinks_id' })
  userLinks: Relation<UserLinks>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
