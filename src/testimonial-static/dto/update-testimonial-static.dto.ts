import { PartialType } from '@nestjs/mapped-types';
import { CreateTestimonialStaticDto } from './create-testimonial-static.dto';

export class UpdateTestimonialStaticDto extends PartialType(CreateTestimonialStaticDto) {}
