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
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SharpPipe } from '../_utils/pipes/sharp.pipe';
import { FileRequiredPipe } from '../_utils/pipes/fileRequired.pipe';

import { CheckAbilities } from '../ability/abilities.decorator';
import { Action } from '../ability/ability.factory';
import { Post as PostEntity } from '../posts/entities/post.entity';
import { AbilitiesGuard } from '../ability/abilities.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // POST
  @Post()
  @UseGuards(JwtAuthGuard)
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
  @Patch('featured')
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({
    action: Action.Update,
    subject: PostEntity,
    field: 'isFeatured',
  })
  async markAsFatured(@Query('id') id: string) {
    return await this.postsService.markAsFatured(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async updatePost(
    @UploadedFile(SharpPipe)
    imageUrl: string | null,
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return await this.postsService.update(id, updateUserDto, imageUrl, req);
  }

  // DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string, @Req() req: Request) {
    return await this.postsService.deletePost(id, req);
  }
}
// **
// @CheckAbilities(new ReadPostAbility())
// @CheckAbilities((ability) => ability.can(Action.Delete, User))
