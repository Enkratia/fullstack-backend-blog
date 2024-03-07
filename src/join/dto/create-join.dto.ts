import { IsString } from 'class-validator';

export class CreateJoinDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
