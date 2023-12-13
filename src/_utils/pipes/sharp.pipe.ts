import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import path from 'path';
import sharp from 'sharp';

import sizeOf from 'image-size';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string | null>>
{
  async transform(image: Express.Multer.File): Promise<string> {
    if (!image) return null;

    const { width, height } = sizeOf(image.buffer);
    const filename = Date.now() + '-' + width + 'x' + height + '.jpeg';

    await sharp(image.buffer)
      .jpeg({ mozjpeg: true })
      .toFile(path.join('images', filename));

    return filename;
  }
}
