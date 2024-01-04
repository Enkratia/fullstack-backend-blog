import { IsString } from 'class-validator';

export class CreateContactUsDto {
  @IsString()
  headerSubtitle: string;

  @IsString()
  headerTitle: string;

  @IsString()
  headerDescription: string;

  @IsString()
  timeDays: string;

  @IsString()
  timeHours: string;

  @IsString()
  timeDescription: string;

  @IsString()
  contactPhone: string;

  @IsString()
  contactEmail: string;
}
