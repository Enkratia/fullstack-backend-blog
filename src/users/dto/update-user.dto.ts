import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
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

export class CreateUserDto {
  // @IsNumber()
  // id: number;

  @IsEmail()
  email: string;

  @IsString()
  fullname: string;

  @IsString()
  @MinLength(6, { message: 'Must be 6 symbols or more' })
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

  // @IsDateString()
  // createdAt: Date;

  // @IsDateString()
  // updatedAt: Date;
}
