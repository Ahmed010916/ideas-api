import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/user.param.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':idea')
  create(
    @Param('idea') idea: string,
    @User() user: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(idea, user, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.commentService.remove(user.id, id);
  }

  @Get(':idea')
  getCommentsOfIdea(@Param('idea') idea: string) {
    return this.commentService.findAll(idea);
  }

  @Get('api/:id')
  getOneComment(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: any,
  ) {
    return this.commentService.update(user.id, id, updateCommentDto);
  }
}
