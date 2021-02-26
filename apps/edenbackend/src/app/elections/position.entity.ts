import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CandidateEntity } from './candidate.entity';
import { ElectionEntity } from './election.entity';

@Entity('positions')
export class PositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @ManyToOne(() => ElectionEntity, election => election.positions)
  election: string;

  @OneToMany(() => CandidateEntity, candidate => candidate.position)
  candidates: CandidateEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
