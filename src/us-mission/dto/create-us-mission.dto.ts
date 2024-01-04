import { IsString } from 'class-validator';

export class CreateUsMissionDto {
  @IsString()
  aboutTitle: string;

  @IsString()
  aboutDescription: string;

  @IsString()
  missionTitle: string;

  @IsString()
  missionDescription: string;
}
