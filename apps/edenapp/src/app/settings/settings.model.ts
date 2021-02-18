export enum SubjectTypes {
  CORE = 'Core',
  ELECTIVE = 'Elective',
}

interface IBase {
  _id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubjectBase {
  title: string;
  type: SubjectTypes;
}

export interface ISubjectPayload extends IBase, ISubjectBase {}

export interface CreateSubjectDto {
  subjects: ISubjectBase[];
}

export interface IDepartmentBase {
  title: string;
  hod: string;
  subjects: string[] | ISubjectPayload[];
}

export interface IDepartmentPayload extends IBase {
  title: string;
  hod: string;
  subjects: ISubjectPayload[];
}
