import { IsEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

// type AboutType = {
//   title: string;
//   description: string;
// };

// type MissionType = {
//   title: string;
//   description: string;
// };

// @Entity()
class AboutEntity {
  title: string;
  description: string;
}

// @Entity()
class MissionEntity {
  title: string;
  description: string;
}

@Entity()
export class UsMission {
  @PrimaryColumn('simple-json')
  about: AboutEntity;

  @Column('simple-json')
  mission: MissionEntity;
}
