import { IsString } from 'class-validator';

export class CreateWhyWeStartedDto {
  @IsString()
  subtitle: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
