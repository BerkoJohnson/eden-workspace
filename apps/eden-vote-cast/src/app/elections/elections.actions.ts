import { createAction, props } from '@ngrx/store';
import { Candidates, Elections, IElection } from './Election';

export const loadElections = createAction('[Elections] Load Elections');

export const CreateNewElection = createAction('[Election] Create Election', props<{election: IElection}>());
export const CreateNewElectionSuccess = createAction('[Election] Create Election Success', props<{election: IElection}>());
export const CreateNewElectionFailure = createAction('[Election] Create Election Failure', props<{error: any}>());

export const loadElectionsSuccess = createAction(
  '[Elections] Load Elections Success',
  props<{ data: Elections }>()
);

export const loadElectionsFailure = createAction(
  '[Elections] Load Elections Failure',
  props<{ error: any }>()
);

export const removePosts = createAction(
  '[Elections] Remove Positions',
  props<{ electionID: string; positions: string[] }>()
);

export const removePostsSuccess = createAction(
  '[Elections] Remove Positions Success',
  props<{ data: IElection }>()
);

export const removePostsFailure = createAction(
  '[Elections] Remove Positions Failure',
  props<{ error: any }>()
);


export const markCurrentElection = createAction(
  '[Elections] Mark Current Election',
  props<{ election: string }>()
);
export const markCurrentPosition = createAction(
  '[Elections] Mark Current Position',
  props<{ position: string }>()
);

export const updateElection = createAction(
  '[Elections] Update Current Election',
  props<{ update: Partial<IElection>; electionID: string }>()
);

export const updateElectionSuccess = createAction(
  '[Elections] Update Current Election Success',
  props<{ election: IElection }>()
);

export const updateElectionFailure = createAction(
  '[Elections] Update Current Election Failure',
  props<{ error: any }>()
);
export const addCandidate = createAction(
  '[Elections] Add New Candidates',
  props<{ candidates: Candidates, electionID: string }>()
);
export const addCandidateSuccess = createAction(
  '[Elections] Add Candidate Success',
  props<{ election: IElection }>()
);

export const addCandidateFailure = createAction(
  '[Elections] Add Candidate Failure',
  props<{ error: any }>()
);
