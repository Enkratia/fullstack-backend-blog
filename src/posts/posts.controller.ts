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

  // POST
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async createPost(
    @UploadedFile(FileRequiredPipe, SharpPipe)
    imageUrl: string,
    @Body() dto: CreatePostDto,
    @Req() req,
  ) {
    return await this.postsService.create(dto, req.user.id, imageUrl);
  }

  // GET
  @Get('tags')
  async findTags(@Query() query: QueryType) {
    return await this.postsService.findTags(query);
  }

  @Get(':id')
  async findPost(@Param('id') id: string, @Query() query: QueryType) {
    return await this.postsService.findOne(id, query);
  }

  @Get()
  async findPosts(@Query() query: QueryType) {
    return await this.postsService.findMany(query);
  }

  // PATCH
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async updatePost(
    @UploadedFile(SharpPipe)
    imageUrl: string | null,
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePostDto,
  ) {
    return await this.postsService.update(id, updateUserDto, imageUrl);
  }

  // DELETE
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}
