import { Injectable } from '@nestjs/common';

import { UpdateAboutUsStaticDto } from './dto/update-about-us-static.dto';
import { AboutUsStatic } from './entities/about-us-static.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AboutUsStaticService {
  constructor(
    @InjectRepository(AboutUsStatic)
    private readonly repository: Repository<AboutUsStatic>,
  ) {}

  // async create(dto: CreateAboutUsStaticDto, imageUrl: string) {
  //   const aboutUsStatic = new AboutUsStatic();
  //   aboutUsStatic.header = {
  //     title: dto.headerTitle,
  //     description: dto.headerDescription,
  //   };
  //   aboutUsStatic.mission = {
  //     title: dto.missionTitle,
  //     description: dto.missionDescription,
  //   };
  //   aboutUsStatic.vision = {
  //     title: dto.visionTitle,
  //     description: dto.visionDescription,
  //   };

  //   aboutUsStatic.imageUrl = imageUrl;

  //   return await this.repository.save(aboutUsStatic);
  // }

  async update(dto: UpdateAboutUsStaticDto, imageUrl: string | null) {
    const aboutUsStatic = new AboutUsStatic();
    aboutUsStatic.header = {
      title: dto.headerTitle,
      description: dto.headerDescription,
    };
    aboutUsStatic.mission = {
      title: dto.missionTitle,
      description: dto.missionDescription,
    };
    aboutUsStatic.vision = {
      title: dto.visionTitle,
      description: dto.visionDescription,
    };

    aboutUsStatic.id = 0;

    if (imageUrl) {
      aboutUsStatic.imageUrl = imageUrl;
    }

    return await this.repository.save(aboutUsStatic);
  }

  async findAll() {
    return await this.repository.find();
  }
}
