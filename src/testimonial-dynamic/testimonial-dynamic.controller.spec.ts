import { Test, TestingModule } from '@nestjs/testing';
import { TestimonialDynamicController } from './testimonial-dynamic.controller';
import { TestimonialDynamicService } from './testimonial-dynamic.service';

describe('TestimonialDynamicController', () => {
  let controller: TestimonialDynamicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestimonialDynamicController],
      providers: [TestimonialDynamicService],
    }).compile();

    controller = module.get<TestimonialDynamicController>(TestimonialDynamicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
