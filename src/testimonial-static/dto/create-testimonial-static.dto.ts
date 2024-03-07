import { IsString } from 'class-validator';

export class CreateTestimonialStaticDto {
  @IsString()
  subtitle: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
