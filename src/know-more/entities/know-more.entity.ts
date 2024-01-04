import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class KnowMore {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column({ default: '' })
  imageUrl: string;
}
