import { IsEmail } from 'class-validator';

export class ForgetUserDto {
  @IsEmail()
  email: string;
}
