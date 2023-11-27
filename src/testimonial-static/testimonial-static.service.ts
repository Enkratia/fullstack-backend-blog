import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTestimonialStaticDto } from './dto/create-testimonial-static.dto';
import { UpdateTestimonialStaticDto } from './dto/update-testimonial-static.dto';
import { TestimonialStatic } from './entities/testimonial-static.entity';

@Injectable()
export class TestimonialStaticService {
  constructor(
    @InjectRepository(TestimonialStatic)
    private readonly testimonialRepository: Repository<TestimonialStatic>,
  ) {}

  async create(createTestimonialStaticDto: CreateTestimonialStaticDto) {
    const result = await this.testimonialRepository.save(
      createTestimonialStaticDto,
    );

    return result;
  }

  async findAll() {
    const result = await this.testimonialRepository.find();

    return result;
  }

  // update(id: number, updateTestimonialStaticDto: UpdateTestimonialStaticDto) {
  //   return `This action updates a #${id} testimonialStatic`;
  // }
}
