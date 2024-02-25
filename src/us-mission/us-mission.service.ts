import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUsMissionDto } from './dto/create-us-mission.dto';
import { UpdateUsMissionDto } from './dto/update-us-mission.dto';
import { UsMission } from './entities/us-mission.entity';

@Injectable()
export class UsMissionService {
  constructor(
    @InjectRepository(UsMission)
    private readonly categoryHeaderRepository: Repository<UsMission>,
  ) {}

  // async create(dto: CreateUsMissionDto) {
  //   const usMission = new UsMission();
  //   usMission.about = {
  //     title: dto.aboutTitle,
  //     description: dto.aboutDescription,
  //   };
  //   usMission.mission = {
  //     title: dto.missionTitle,
  //     description: dto.missionDescription,
  //   };

  //   return await this.categoryHeaderRepository.save(usMission);
  // }

  async update(dto: UpdateUsMissionDto) {
    const usMission = new UsMission();
    usMission.about = {
      title: dto.aboutTitle,
      description: dto.aboutDescription,
    };
    usMission.mission = {
      title: dto.missionTitle,
      description: dto.missionDescription,
    };

    usMission.id = 0;

    return await this.categoryHeaderRepository.save(usMission);
  }

  async findAll() {
    return await this.categoryHeaderRepository.find();
  }
}
