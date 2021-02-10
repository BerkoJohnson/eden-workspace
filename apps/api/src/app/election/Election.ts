export interface IElection extends IBase {
  title: string;
  academicYear: string;
  positions: Positions;
  candidates: Candidates;
}

export type Elections = IElection[];

interface IBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPosition extends IBase {
  pos_name: string;
  candidates: Candidates;
  election: string;
}

export type Positions = IPosition[];

export interface ICandidate extends IBase {
  position: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'Male' | 'Female';
  room: string;
  nickname: string;
  displayMessage?: string;
}

export type Candidates = ICandidate[];
