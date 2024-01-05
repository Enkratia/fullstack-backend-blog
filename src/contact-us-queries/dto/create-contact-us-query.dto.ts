import { IsString } from 'class-validator';

export class CreateContactUsQueryDto {
  @IsString()
  queries: string;
}
