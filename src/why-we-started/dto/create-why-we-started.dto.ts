import { IsNumber, IsString } from 'class-validator';

export class CreateWhyWeStartedDto {
  @IsNumber()
  id: number;

  @IsString()
  imageUrl: string;

  @IsString()
  subtitle: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
