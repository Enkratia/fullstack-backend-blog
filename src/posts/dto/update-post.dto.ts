import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostDto extends CreatePostDto {
  @IsOptional()
  @IsBoolean()
  isFeatured: boolean;
}
