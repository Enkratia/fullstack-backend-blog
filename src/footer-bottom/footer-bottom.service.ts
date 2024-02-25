import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFooterBottomDto } from './dto/create-footer-bottom.dto';
import { UpdateFooterBottomDto } from './dto/update-footer-bottom.dto';
import { FooterBottom } from './entities/footer-bottom.entity';

@Injectable()
export class FooterBottomService {
  constructor(
    @InjectRepository(FooterBottom)
    private readonly repository: Repository<FooterBottom>,
  ) {}

  // async create(dto: CreateFooterBottomDto) {
  //   const footerBottom = new FooterBottom();
  //   footerBottom.phone = dto.phone;
  //   footerBottom.email = dto.email;
  //   footerBottom.address = dto.address;
  //   footerBottom.socialLinks = {
  //     twitter: dto.twitter,
  //     facebook: dto.facebook,
  //     instagram: dto.instagram,
  //     linkedin: dto.linkedin,
  //   };

  //   return await this.repository.save(footerBottom);
  // }

  async update(dto: UpdateFooterBottomDto) {
    const footerBottom = new FooterBottom();
    footerBottom.phone = dto.phone;
    footerBottom.email = dto.email;
    footerBottom.address = dto.address;
    footerBottom.socialLinks = {
      twitter: dto.twitter,
      facebook: dto.facebook,
      instagram: dto.instagram,
      linkedin: dto.linkedin,
    };

    footerBottom.id = 0;

    return await this.repository.save(footerBottom);
  }

  async findAll() {
    return await this.repository.find();
  }
}

// JSON search
// return await this.repository
// .createQueryBuilder('b')
// .where(`b.socialLinks->>'facebook' = :facebook`, { facebook: 'test4' })
// .getMany();
