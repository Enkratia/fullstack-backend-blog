import { Test, TestingModule } from '@nestjs/testing';
import { FeaturedInController } from './featured-in.controller';
import { FeaturedInService } from './featured-in.service';

describe('FeaturedInController', () => {
  let controller: FeaturedInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturedInController],
      providers: [FeaturedInService],
    }).compile();

    controller = module.get<FeaturedInController>(FeaturedInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
