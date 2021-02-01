import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './candidate.schemat';

import { ElectionController } from './election.controller';
import { Election, ElectionSchema } from './election.schema';
import { ElectionService } from './election.service';
import { Position, PositionSchema } from './position.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
      { name: Election.name, schema: ElectionSchema },
      { name: Position.name, schema: PositionSchema },
    ]),
  ],
  providers: [ElectionService],
  controllers: [ElectionController],
  exports: [ElectionService],
})
export class ElectionModule {}
