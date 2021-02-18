import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../shared/user.decorator';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('idea/:id')
  showCommentsByIdea(@Param('id') idea: string) {
    return this.commentService.showByIdea(idea);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string) {
    return this.commentService.showByUser(user);
  }

  @Post('idea/:id')
  @UseGuards(AuthGuard)
  createComment(
    @Body(ValidationPipe) data: CommentDto,
    @Param('id') idea: string,
    @User('id') user: string,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  destroyComment(@Param('id') id: string, @User('id') user: string) {
    return this.commentService.destroy(id, user);
  }
}
