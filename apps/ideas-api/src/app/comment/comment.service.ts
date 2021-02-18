import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentDto } from './comment.dto';
import { IdeaEntity, CommentEntity, UserEntity } from '../entities';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponse(comment: CommentEntity) {
    return {
      ...comment,
      author: comment.author && comment.author.toResponseObject(false),
    };
  }

  async create(ideaId: string, userId: string, data: CommentDto) {
    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = this.commentRepository.create({
      ...data,
      idea,
      author: user,
    });

    await this.commentRepository.save(comment);
    return this.toResponse(comment);
  }

  async destroy(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });

    if (comment.author.id !== userId) {
      throw new UnauthorizedException('You do not own this comment');
    }

    await this.commentRepository.remove(comment);
    return this.toResponse(comment);
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    return this.toResponse(comment);
  }

  async showByIdea(ideaId: string) {
    const comments = await this.commentRepository.find({
      where: { idea: ideaId },
      relations: ['comments', 'comments.author', 'comments.idea'],
    });

    return comments.map(comment => this.toResponse(comment));
  }

  async showByUser(userId: string) {
    const comments = await this.commentRepository.find({
      where: { author: userId },
      relations: ['author '],
    });

    return comments.map(comment => this.toResponse(comment));
  }
}
