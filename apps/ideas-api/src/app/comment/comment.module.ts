import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity, CommentEntity, UserEntity} from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, IdeaEntity, UserEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
