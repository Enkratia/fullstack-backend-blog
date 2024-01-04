import { IsString } from 'class-validator';

export class CreateCategoryHeaderDto {
  @IsString()
  economy: string;

  @IsString()
  technology: string;

  @IsString()
  business: string;

  @IsString()
  startup: string;
}
