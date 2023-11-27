import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class ContactUsHeaderDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;
}

class ContactUsTimeDto {
  @IsString()
  days: string;

  @IsString()
  hours: string;

  @IsString()
  description: string;
}

class ContactUsDataDto {
  @IsString()
  phone: string;

  @IsString()
  email: string;
}

export class CreateContactUsDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactUsHeaderDto)
  header: ContactUsHeaderDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactUsTimeDto)
  time: ContactUsTimeDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactUsDataDto)
  data: ContactUsDataDto;
}
