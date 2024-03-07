import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Join {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
