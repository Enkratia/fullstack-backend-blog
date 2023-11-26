import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryHeaderDto } from './create-category-header.dto';

export class UpdateCategoryHeaderDto extends PartialType(CreateCategoryHeaderDto) {}
