import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class AboutEntity {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

class MissionEntity {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateUsMissionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AboutEntity)
  about: AboutEntity;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MissionEntity)
  mission: MissionEntity;
}
