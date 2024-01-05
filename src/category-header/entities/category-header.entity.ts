import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CategoryHeader {
  @PrimaryColumn()
  category: string;

  @Column()
  description: string;
}
