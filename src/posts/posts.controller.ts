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
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async createPost(
    @UploadedFile(FileRequiredPipe, SharpPipe)
    imageUrl: string,
    @Body() dto: CreatePostDto,
    @Req() req,
  ) {
    return await this.postsService.create(dto, +req.user.id, imageUrl);
  }

  @Get(':id')
  async findPost(@Param('id') id: number) {
    return await this.postsService.findOne(id);
  }

  @Get()
  async findPosts(@Query() query: QueryType) {
    return await this.postsService.findMany(query);
  }

  @UseGuards(JwtAuthGuard)
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
}
