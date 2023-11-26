import { PartialType } from '@nestjs/mapped-types';
import { CreateUsMissionDto } from './create-us-mission.dto';

export class UpdateUsMissionDto extends PartialType(CreateUsMissionDto) {}
