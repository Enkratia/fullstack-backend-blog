import { IsEmail } from 'class-validator';

export class CreateSubscribeDto {
  @IsEmail()
  email: string;
}
