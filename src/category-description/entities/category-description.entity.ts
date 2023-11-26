import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
