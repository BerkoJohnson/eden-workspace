import { IsNotEmpty, IsOptional } from 'class-validator';
import { Genders } from '../shared/gender.enum';

export class CandidateDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmpty()
  gender: Genders;

  @IsNotEmpty()
  class: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  election: string;
}


export class CandidateUpdateDto {
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @IsNotEmpty()
  @IsOptional()
  date_of_birth: string;

  @IsNotEmpty()
  @IsOptional()
  gender: Genders;

  @IsNotEmpty()
  @IsOptional()
  class: string;
}
