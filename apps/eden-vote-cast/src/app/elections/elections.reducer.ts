import { createReducer, on } from '@ngrx/store';
import { Elections } from './Election';
import * as ElectionsActions from './elections.actions';

export const electionsFeatureKey = 'elections';

export interface State {
  lists: Elections;
  currentElection: string;
  currentPosition: string;
  listLoaded: boolean;
  error: any;
}

export const initialState: State = {
  lists: [],
  currentElection: null,
  currentPosition: null,
  listLoaded: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ElectionsActions.loadElectionsSuccess, (state, { data }) => {
    return {
      ...state,
      lists: data,
      listLoaded: true,
    };
  }),
  on(ElectionsActions.loadElectionsFailure, (state, { error }) => {
    return {
      ...state,
      listLoaded: false,
      error,
    };
  }),
  on(ElectionsActions.markCurrentElection, (state, {election}) => {
    return {
      ...state,
      currentElection: election
    }
  }),
  on(ElectionsActions.markCurrentPosition, (state, {position}) => {
    return {
      ...state,
      currentPosition: position
    }
  }),
  on(ElectionsActions.removePostsSuccess, (state, {data}) => {
    const updatedElections = state.lists.concat();
    updatedElections[updatedElections.findIndex(elec => elec._id === data._id)] = data
    return {
      ...state,
      lists: updatedElections
    }
  }),
  on(ElectionsActions.removePostsFailure, (state, {error}) => {
    return {
      ...state,
      error
    }
  }),
  on(ElectionsActions.updateElectionSuccess, (state, {election}) => {
    const updatedElections = state.lists.concat();
    updatedElections[updatedElections.findIndex(elec => elec._id === election._id)] = election
    return {
      ...state,
      lists: updatedElections
    }
  }),
  on(ElectionsActions.updateElectionFailure, (state, {error}) => {
    return {
      ...state,
      error
    }
  }),
  on(ElectionsActions.addCandidateSuccess, (state, {election}) => {
    const updatedElections = state.lists.concat();
    updatedElections[updatedElections.findIndex(elec => elec._id === election._id)] = election
    return {
      ...state,
      lists: updatedElections
    }
  }),
  on(ElectionsActions.addCandidateFailure, (state, {error}) => {
    return {
      ...state,
      error
    }
  }),
);
