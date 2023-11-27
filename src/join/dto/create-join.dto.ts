import { IsNumber, IsString } from 'class-validator';

export class CreateJoinDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}
