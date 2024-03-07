import { IsString } from 'class-validator';

export class CreateFeaturedInDto {
  @IsString()
  title: string;

  @IsString()
  linkUrl: string;
}
