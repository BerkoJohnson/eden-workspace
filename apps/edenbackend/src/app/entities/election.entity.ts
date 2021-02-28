import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { CandidateEntity } from './candidate.entity';

@Entity('elections')
export class ElectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column({ type: 'char', length: 9 })
  academic_year: string;

  @OneToMany(() => PositionEntity, position => position.election)
  positions: PositionEntity[];

  @OneToMany(() => CandidateEntity, candidate => candidate.election)
  candidates: CandidateEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
