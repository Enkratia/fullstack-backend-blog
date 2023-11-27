import { PartialType } from '@nestjs/mapped-types';
import { CreateWhyWeStartedDto } from './create-why-we-started.dto';

export class UpdateWhyWeStartedDto extends PartialType(CreateWhyWeStartedDto) {}
