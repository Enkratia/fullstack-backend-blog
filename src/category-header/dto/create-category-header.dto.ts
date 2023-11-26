import { IsNotEmpty } from 'class-validator';

export class CreateCategoryHeaderDto {
  @IsNotEmpty()
  description: string;
}
