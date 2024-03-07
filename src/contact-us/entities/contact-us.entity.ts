import { Column, Entity, PrimaryColumn } from 'typeorm';

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

class ContactUsContactEntity {
  phone: string;
  email: string;
}

@Entity()
export class ContactUs {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column('simple-json')
  header: ContactUsHeaderEntity;

  @Column('simple-json')
  time: ContactUsTimeEntity;

  @Column('simple-json')
  contact: ContactUsContactEntity;
}
