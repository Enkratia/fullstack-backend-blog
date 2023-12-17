import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;
}
