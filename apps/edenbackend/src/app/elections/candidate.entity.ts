import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genders } from '../shared/gender.enum';
import { PositionEntity } from './position.entity';

@Entity('candidates')
export class CandidateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({
    type: 'enum',
    enum: Genders,
    default: Genders.MALE,
  })
  gender: Genders;

  @Column()
  class: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => PositionEntity, position => position.candidates)
  position: PositionEntity;
}
