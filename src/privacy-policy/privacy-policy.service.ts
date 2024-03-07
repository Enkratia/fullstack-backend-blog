import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Injectable()
export class PrivacyPolicyService {
  constructor(
    @InjectRepository(PrivacyPolicy)
    private readonly privacyPolicyRepository: Repository<PrivacyPolicy>,
  ) {}

  // async create(dto: CreatePrivacyPolicyDto) {
  //   const privacyPolicy = new PrivacyPolicy();
  //   privacyPolicy.message = dto.message;

  //   return await this.privacyPolicyRepository.save(privacyPolicy);
  // }

  async update(dto: UpdatePrivacyPolicyDto) {
    const privacyPolicy = new PrivacyPolicy();
    privacyPolicy.message = dto.message;

    privacyPolicy.id = 0;

    return await this.privacyPolicyRepository.save(privacyPolicy);
  }

  async findOne() {
    return await this.privacyPolicyRepository.findOne({ where: { id: 0 } });
  }
}
