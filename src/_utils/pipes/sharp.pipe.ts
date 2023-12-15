import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import path from 'path';

import sharp from 'sharp';
import sizeOf from 'image-size';

const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string | null>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) return null;

    if (!mimeTypes.includes(image.mimetype)) {
      throw new BadRequestException('Invalid mimetype');
    }

    const ext = path.parse(image.originalname).ext;

    const { width, height } = sizeOf(image.buffer);
    const filename = Date.now() + '-' + width + 'x' + height + ext;

    if (ext === '.svg') {
      await sharp(image.buffer).toFile(path.join('images', filename));
    } else {
      await sharp(image.buffer)
        .jpeg({ mozjpeg: true })
        .png()
        .toFile(path.join('images', filename));
    }

    return filename;
  }
}
