import { IsNumber, IsString } from 'class-validator';

export class CreateTestimonialStaticDto {
  @IsNumber()
  id: number;

  @IsString()
  subtitle: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
