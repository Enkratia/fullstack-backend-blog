import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KnowMore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;
}
