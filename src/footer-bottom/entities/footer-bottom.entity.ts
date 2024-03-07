import { Column, Entity, PrimaryColumn } from 'typeorm';

class SocialLinksEntity {
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

@Entity()
export class FooterBottom {
  @PrimaryColumn({ default: 0 })
  id: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'json' })
  socialLinks: SocialLinksEntity;
}
