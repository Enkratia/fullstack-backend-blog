import { IsNumber, IsString } from 'class-validator';

export class CreateKnowMoreDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;
}
