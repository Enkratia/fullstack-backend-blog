import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryDescriptionDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  description: string;
}
