import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WhyWeStarted {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  subtitle: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
