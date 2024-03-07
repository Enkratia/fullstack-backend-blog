import { IsString } from 'class-validator';

export class CreateCategoryDescriptionDto {
  @IsString()
  startup: string;

  @IsString()
  economy: string;

  @IsString()
  technology: string;

  @IsString()
  business: string;
}
