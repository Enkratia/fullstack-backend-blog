import { PartialType } from '@nestjs/mapped-types';
import { CreateWhyThisBlogDto } from './create-why-this-blog.dto';

export class UpdateWhyThisBlogDto extends PartialType(CreateWhyThisBlogDto) {}
