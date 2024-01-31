import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactUsMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  query: string;

  @Column()
  message: string;

  @Column({ default: false })
  read: boolean;
}
