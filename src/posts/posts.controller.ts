import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async createPost(
    @UploadedFile(SharpPipe)
    imageUrl: string | null,
    @Body() dto: CreatePostDto,
    @Req() req,
  ) {
    return await this.postsService.create(dto, +req.user.id, imageUrl);
  }

  // @Get()
  // findAll() {
  //   return this.postsService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  update(
    @UploadedFile(SharpPipe)
    imageUrl: string | null,
    @Param('id') id: number,
    @Body() updateUserDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updateUserDto, imageUrl);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
