import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAll(query: QueryType) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.repository.createQueryBuilder('t');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.where(
          `to_tsvector('simple', t.text) @@ to_tsquery('simple', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );

        qb.orWhere(
          `to_tsvector('simple', t.fullname) @@ to_tsquery('simple', :formattedSearch)`,
          { formattedSearch: `${formattedSearch}:*` },
        );
      }

      delete query._q;
    }

    // PAGINATION
    if (query._page) {
      const limit = query._limit ? +query._limit : 8;

      qb.take(limit);
      qb.skip((query._page - 1) * limit);

      delete query._page;
      delete query._limit;
    }

    // SORT (ORDER)
    if (query._sort) {
      const order = query._order?.toUpperCase() !== 'DESC' ? 'ASC' : 'DESC';
      qb.orderBy(`t.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
  }

  async findOneById(id: number) {
    return await this.repository.findOne({ where: { id } });
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

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
