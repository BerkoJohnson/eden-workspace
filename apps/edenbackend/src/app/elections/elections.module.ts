import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionsService } from './elections.service';
import { ElectionsController } from './elections.controller';
import { CandidateEntity, ElectionEntity, PositionEntity } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateEntity, PositionEntity,ElectionEntity]),
  ],
  controllers: [ElectionsController],
  providers: [ElectionsService],
  exports: [],
})
export class ElectionModule {}
