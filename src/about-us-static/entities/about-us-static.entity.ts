import { Column, Entity, PrimaryColumn } from 'typeorm';

class HeaderEntity {
  title: string;
  description: string;
}

class MissionEntity {
  title: string;
  description: string;
}

class VisionEntity {
  title: string;
  description: string;
}

@Entity()
export class AboutUsStatic {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column('simple-json')
  header: HeaderEntity;

  @Column('simple-json')
  mission: MissionEntity;

  @Column('simple-json')
  vision: VisionEntity;

  @Column({ default: '' })
  imageUrl: string;
}
