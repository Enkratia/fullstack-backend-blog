import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  contentText: string;

  @IsString()
  contentJson: string;

  @IsString()
  tags: string;
}
