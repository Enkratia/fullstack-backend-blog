import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class UserLinksDto {
  @IsString()
  facebook: string;

  @IsString()
  twitter: string;

  @IsString()
  instagram: string;

  @IsString()
  linkedin: string;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  profession: string;

  @IsString()
  company: string;

  @IsString()
  representation: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserLinksDto)
  userLinks: UserLinksDto;
}
