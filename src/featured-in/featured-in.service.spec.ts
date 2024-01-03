import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedInService } from './featured-in.service';

describe('FeaturedInService', () => {
  let service: FeaturedInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturedInService],
    }).compile();

    service = module.get<FeaturedInService>(FeaturedInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
