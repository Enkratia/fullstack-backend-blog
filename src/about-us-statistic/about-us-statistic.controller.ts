import { Controller, Get } from '@nestjs/common';
import { AboutUsStatisticService } from './about-us-statistic.service';

@Controller('about-us-statistic')
export class AboutUsStatisticController {
  constructor(
    private readonly aboutUsStatisticService: AboutUsStatisticService,
  ) {}

  @Get()
  async findAll() {
    return await this.aboutUsStatisticService.findAll();
  }
}
