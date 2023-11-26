import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDescriptionDto } from './create-category-description.dto';

export class UpdateCategoryDescriptionDto extends PartialType(CreateCategoryDescriptionDto) {}
