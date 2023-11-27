import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class ContactUsHeaderEntity {
  title: string;
  subtitle: string;
  description: string;
}

class ContactUsTimeEntity {
  days: string;
  hours: string;
  description: string;
}

class ContactUsDataEntity {
  phone: string;
  email: string;
}

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  header: ContactUsHeaderEntity;

  @Column('simple-json')
  time: ContactUsTimeEntity;

  @Column('simple-json')
  data: ContactUsDataEntity;
}
