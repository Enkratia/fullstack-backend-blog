import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

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

  // **
  @IsString()
  facebook: string;

  @IsString()
  twitter: string;

  @IsString()
  instagram: string;

  @IsString()
  linkedin: string;
}
