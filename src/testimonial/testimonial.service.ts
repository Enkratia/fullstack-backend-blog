import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repository: Repository<Testimonial>,
  ) {}

  async create(dto: CreateTestimonialDto, imageUrl: string | null) {
    const testimonial = new Testimonial();
    testimonial.fullname = dto.fullname;
    testimonial.address = dto.address;
    testimonial.text = dto.text;

    if (imageUrl) {
      testimonial.imageUrl = imageUrl;
    }

    return await this.repository.save(testimonial);
  }

  async findAll() {
    return await this.repository.find();
  }

  async update(id: number, dto: UpdateTestimonialDto, imageUrl: string | null) {
    const testimonial = new Testimonial();
    testimonial.id = id;
    testimonial.fullname = dto.fullname;
    testimonial.address = dto.address;
    testimonial.text = dto.text;

    if (imageUrl) {
      testimonial.imageUrl = imageUrl;
    }

    return await this.repository.save(testimonial);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} testimonial`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} testimonial`;
  // }
}
