import { Injectable } from '@nestjs/common';

import { CreateAboutUsStaticDto } from './dto/create-about-us-static.dto';
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

  async create(dto: CreateAboutUsStaticDto, imageUrl: string) {
    const aboutUsStatic = new AboutUsStatic();
    aboutUsStatic.headerTitle = dto.headerTitle;
    aboutUsStatic.headerDescription = dto.headerDescription;
    aboutUsStatic.missionTitle = dto.missionTitle;
    aboutUsStatic.missionDescription = dto.missionDescription;
    aboutUsStatic.visionTitle = dto.visionTitle;
    aboutUsStatic.visionDescription = dto.visionDescription;

    aboutUsStatic.imageUrl = imageUrl;

    return await this.repository.save(aboutUsStatic);
  }

  async update(dto: UpdateAboutUsStaticDto, imageUrl: string | null) {
    const aboutUsStatic = new AboutUsStatic();
    aboutUsStatic.headerTitle = dto.headerTitle;
    aboutUsStatic.headerDescription = dto.headerDescription;
    aboutUsStatic.missionTitle = dto.missionTitle;
    aboutUsStatic.missionDescription = dto.missionDescription;
    aboutUsStatic.visionTitle = dto.visionTitle;
    aboutUsStatic.visionDescription = dto.visionDescription;
    aboutUsStatic.id = 0;

    if (imageUrl) {
      aboutUsStatic.imageUrl = imageUrl;
    }

    return await this.repository.save(aboutUsStatic);
  }

  async findAll() {
    return await this.repository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} aboutUsStatic`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} aboutUsStatic`;
  // }
}
