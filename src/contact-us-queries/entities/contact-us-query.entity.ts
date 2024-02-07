import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactUsQuery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}
