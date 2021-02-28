import {
  Column,
  CreateDateColumn,
  Entity, Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CandidateEntity } from './candidate.entity';
import { ElectionEntity } from './election.entity';

@Entity('positions')
@Index(['title', 'election'], {unique: true})
export class PositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne(() => ElectionEntity, election => election.positions)
  election: ElectionEntity;

  @OneToMany(() => CandidateEntity, candidate => candidate.position)
  candidates: CandidateEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
