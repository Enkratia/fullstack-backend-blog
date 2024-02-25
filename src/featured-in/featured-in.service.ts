import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFeaturedInDto } from './dto/create-featured-in.dto';
import { UpdateFeaturedInDto } from './dto/update-featured-in.dto';
import { FeaturedIn } from './entities/featured-in.entity';

@Injectable()
export class FeaturedInService {
  constructor(
    @InjectRepository(FeaturedIn)
    private readonly repository: Repository<FeaturedIn>,
  ) {}

  async create(dto: CreateFeaturedInDto, imageUrl: string) {
    const featuredIn = new FeaturedIn();
    featuredIn.title = dto.title;
    featuredIn.linkUrl = dto.linkUrl;
    featuredIn.imageUrl = imageUrl;

    return await this.repository.save(featuredIn);
  }

  async update(id: number, dto: UpdateFeaturedInDto, imageUrl: string | null) {
    const featuredIn = new FeaturedIn();
    featuredIn.title = dto.title;
    featuredIn.linkUrl = dto.linkUrl;

    featuredIn.id = id;

    if (imageUrl) {
      featuredIn.imageUrl = imageUrl;
    }

    return await this.repository.save(featuredIn);
  }

  async findAll(query: QueryType) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.repository.createQueryBuilder('f');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.where(
          `to_tsvector('simple', f.title) @@ to_tsquery('simple', :formattedSearch)`,
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
      qb.orderBy(`f.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
  }

  async findOneById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
