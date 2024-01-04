import { IsString } from 'class-validator';

export class CreateKnowMoreDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;
}
