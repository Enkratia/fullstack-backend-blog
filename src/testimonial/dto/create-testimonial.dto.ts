import { IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  fullname: string;

  @IsString()
  address: string;

  @IsString()
  text: string;
}
