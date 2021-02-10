import {IsArray} from 'class-validator';

export enum SubjectTypes {
  CORE = 'Core',
  ELECTIVE = 'Elective',
}


export interface ISubjectBase {
  title: string;
  type: SubjectTypes;
}

export class CreateSubjectDto {
  @IsArray()
  subjects: ISubjectBase[];
}

