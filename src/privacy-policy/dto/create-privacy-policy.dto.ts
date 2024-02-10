import { IsString } from 'class-validator';

export class CreatePrivacyPolicyDto {
  @IsString()
  message: string;
}
