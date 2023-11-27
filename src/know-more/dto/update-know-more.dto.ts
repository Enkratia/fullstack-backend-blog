import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowMoreDto } from './create-know-more.dto';

export class UpdateKnowMoreDto extends PartialType(CreateKnowMoreDto) {}
