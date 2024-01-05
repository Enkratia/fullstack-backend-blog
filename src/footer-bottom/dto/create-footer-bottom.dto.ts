import { IsString } from 'class-validator';

export class CreateFooterBottomDto {
  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  twitter: string;

  @IsString()
  facebook: string;

  @IsString()
  instagram: string;

  @IsString()
  linkedin: string;
}
