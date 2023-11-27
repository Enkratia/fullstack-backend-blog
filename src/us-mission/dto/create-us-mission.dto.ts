import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AboutDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

class MissionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateUsMissionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AboutDto)
  about: AboutDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MissionDto)
  mission: MissionDto;
}
