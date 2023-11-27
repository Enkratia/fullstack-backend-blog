import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestimonialStatic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subtitle: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
