import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeaturedIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  linkUrl: string;

  @Column()
  imageUrl: string;
}
