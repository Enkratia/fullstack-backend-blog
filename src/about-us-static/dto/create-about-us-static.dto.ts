import { IsString } from 'class-validator';

export class CreateAboutUsStaticDto {
  @IsString()
  headerTitle: string;

  @IsString()
  headerDescription: string;

  @IsString()
  missionTitle: string;

  @IsString()
  missionDescription: string;

  @IsString()
  visionTitle: string;

  @IsString()
  visionDescription: string;
}
