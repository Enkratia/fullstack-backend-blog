import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ContactUsQuery {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column('simple-array')
  queries: string[];
}
