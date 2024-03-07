import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CategoryHeader {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  economy: string;

  @Column()
  technology: string;

  @Column()
  business: string;

  @Column()
  startup: string;
}
