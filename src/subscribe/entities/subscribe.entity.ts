import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Subscribe {
  @PrimaryColumn()
  email: string;
}
