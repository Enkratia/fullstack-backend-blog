import { IsEmail, IsString } from 'class-validator';

export class CreateContactUsMessageDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  query: string;

  @IsString()
  message: string;
}
