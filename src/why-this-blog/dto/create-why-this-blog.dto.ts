import { IsString } from 'class-validator';

export class CreateWhyThisBlogDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;
}
