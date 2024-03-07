import { BadRequestException, Injectable } from '@nestjs/common';
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

  // async create(dto: CreateTestimonialStaticDto) {
  //   const testimonialStatic = new TestimonialStatic();
  //   testimonialStatic.title = dto.title;
  //   testimonialStatic.subtitle = dto.subtitle;
  //   testimonialStatic.description = dto.description;

  //   return await this.testimonialRepository.save(testimonialStatic);
  // }

  async update(dto: UpdateTestimonialStaticDto) {
    const testimonialStatic = new TestimonialStatic();
    testimonialStatic.title = dto.title;
    testimonialStatic.subtitle = dto.subtitle;
    testimonialStatic.description = dto.description;

    testimonialStatic.id = 0;

    return await this.testimonialRepository.save(testimonialStatic);
  }

  async findAll() {
    return await this.testimonialRepository.find();
  }
}
