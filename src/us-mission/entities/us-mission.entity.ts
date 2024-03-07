import { Column, Entity, PrimaryColumn } from 'typeorm';

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
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column('simple-json')
  about: AboutEntity;

  @Column('simple-json')
  mission: MissionEntity;
}
