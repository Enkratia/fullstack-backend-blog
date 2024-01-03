import { Test, TestingModule } from '@nestjs/testing';
import { TestimonialDynamicService } from './testimonial-dynamic.service';

describe('TestimonialDynamicService', () => {
  let service: TestimonialDynamicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestimonialDynamicService],
    }).compile();

    service = module.get<TestimonialDynamicService>(TestimonialDynamicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
