import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CategoryHeader {
  @PrimaryColumn()
  description: string;
}
