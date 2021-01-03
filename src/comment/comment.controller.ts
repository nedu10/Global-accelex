import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('add-comment')
  @UsePipes(ValidationPipe)
  create_comment(
    @Body() create_comment_dto: CreateCommentDto,
  ): Promise<object> {
    return this.commentService.create_comment(create_comment_dto);
  }

  @Get(':episode_id')
  get_comments(
    @Param('episode_id', ParseIntPipe) episode_id: number,
  ): Promise<object> {
    return this.commentService.get_comments(episode_id);
  }

  @Get(':comment_id/:episode_id')
  single_comment(
    @Param('episode_id', ParseIntPipe) episode_id: number,
    @Param('comment_id', ParseIntPipe) comment_id: number,
  ): Promise<object> {
    return this.commentService.single_comment(episode_id, comment_id);
  }
}
