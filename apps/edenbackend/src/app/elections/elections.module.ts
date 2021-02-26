import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateEntity } from './candidate.entity';
import { ElectionEntity } from './election.entity';
import { PositionEntity } from './position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ElectionEntity, PositionEntity, CandidateEntity]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ElectionModule {}
