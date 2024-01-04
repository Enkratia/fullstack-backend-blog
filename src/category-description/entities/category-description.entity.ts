import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CategoryDescription {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  startup: string;

  @Column()
  economy: string;

  @Column()
  technology: string;

  @Column()
  business: string;
}
