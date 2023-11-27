import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class AboutEntity {
  title: string;
  description: string;
}

class MissionEntity {
  title: string;
  description: string;
}

@Entity()
export class UsMission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  about: AboutEntity;

  @Column('simple-json')
  mission: MissionEntity;
}
