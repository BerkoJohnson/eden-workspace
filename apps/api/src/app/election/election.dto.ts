import { IsArray, IsString, Matches } from 'class-validator';
import { Candidates } from './Election';

export class CreateElectionDto {
  @IsString()
  title: string;

  @IsString()
  @Matches(/^202[1-9]{1}\/202[1-9]{1}/)
  academicYear: string;

  @IsArray()
  positions: { pos_name: string, _id: string}[];
}


export class CreateCandidateDto {
  @IsArray()
  candidates: Candidates
}
