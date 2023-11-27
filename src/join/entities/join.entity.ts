import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Join {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
