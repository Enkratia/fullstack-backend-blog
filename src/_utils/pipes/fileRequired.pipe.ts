import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileRequiredPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) throw new BadRequestException('File is required');
    return value;
  }
}
