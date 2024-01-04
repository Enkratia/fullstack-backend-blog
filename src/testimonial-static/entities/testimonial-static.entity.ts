import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestimonialStatic {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  subtitle: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
