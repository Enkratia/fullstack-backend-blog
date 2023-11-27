import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDescriptionDto {
  @IsNumber()
  id: number;

  @IsString()
  description: string;
}
