import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateContactUsQueryDto } from './dto/create-contact-us-query.dto';
import { UpdateContactUsQueryDto } from './dto/update-contact-us-query.dto';
import { ContactUsQuery } from './entities/contact-us-query.entity';

@Injectable()
export class ContactUsQueriesService {
  constructor(
    @InjectRepository(ContactUsQuery)
    private readonly repository: Repository<ContactUsQuery>,
  ) {}

  async create(dto: CreateContactUsQueryDto) {
    const contactUsQuery = new ContactUsQuery(dto.content);
    return await this.repository.save(contactUsQuery);
  }

  async update(dto: UpdateContactUsQueryDto, id: number) {
    const contactUsQuery = new ContactUsQuery(dto.content);
    contactUsQuery.id = id;

    return await this.repository.save(contactUsQuery);
  }

  async findAll(query: QueryType) {
    // WHITEWASH
    for (let q in query) {
      if (q.includes(' ')) {
        throw new BadRequestException('Spaces in keys are not allowed');
      }
    }

    const qb = this.repository.createQueryBuilder('q');

    // FULL-TEXT-SEARCH
    if (query._q) {
      const preFormat = query._q.replace(/[!:?()<|]/g, ' ');
      const formattedSearch = preFormat.trim().replace(/\s+/g, ' & ');

      if (formattedSearch) {
        qb.where(
          `to_tsvector('simple', q.content) @@ to_tsquery('simple', :formattedSearch)`,
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
      qb.orderBy(`q.${query._sort}`, order);

      delete query._sort;
      delete query._order;
    }

    const [data, totalCount] = await qb.getManyAndCount();
    return { data, totalCount };
  }

  async remove(id: number) {
    return await this.repository.delete({ id });
  }
}
