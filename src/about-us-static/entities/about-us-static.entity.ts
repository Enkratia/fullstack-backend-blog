import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateAboutUsStaticDto } from '../dto/create-about-us-static.dto';

@Entity()
export class AboutUsStatic {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  headerTitle: string;

  @Column()
  headerDescription: string;

  @Column()
  missionTitle: string;

  @Column()
  missionDescription: string;

  @Column()
  visionTitle: string;

  @Column()
  visionDescription: string;

  @Column({ default: '' })
  imageUrl: string;
}

// class HeaderEntity {
//   title: string;
//   description: string;
// }

// class MissionEntity {
//   title: string;
//   description: string;
// }

// class VisionEntity {
//   title: string;
//   description: string;
// }

// @Entity()
// export class AboutUsStatic {
//   @PrimaryColumn({ default: 0 })
//   id: number;

//   @Column('simple-json')
//   header: HeaderEntity;

//   @Column('simple-json')
//   mission: MissionEntity;

//   @Column('simple-json')
//   vision: VisionEntity;
// }
