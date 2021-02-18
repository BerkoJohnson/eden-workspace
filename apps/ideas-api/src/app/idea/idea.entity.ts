import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '../entities';
import { UserEntity } from '../user/user.entity';

@Entity('ideas')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updated: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;

  @OneToMany(type => CommentEntity, comment => comment.idea, {cascade: true})
  comments: CommentEntity[];
}
