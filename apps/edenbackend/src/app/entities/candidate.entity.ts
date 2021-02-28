import {
  Column,
  CreateDateColumn,
  Entity, Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genders } from '../shared/gender.enum';
import { PositionEntity } from './position.entity';
import { ElectionEntity } from './election.entity';

@Entity('candidates')
@Index(['first_name', 'last_name'], {unique: true})
export class CandidateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column({
    type: 'enum',
    enum: Genders,
    default: Genders.MALE,
  })
  gender: Genders;

  @Column()
  date_of_birth: string;

  @Column()
  class: string;

  @ManyToOne(() => PositionEntity, position => position.candidates)
  position: PositionEntity;

  @ManyToOne(() => ElectionEntity, election => election.candidates)
  election: ElectionEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
