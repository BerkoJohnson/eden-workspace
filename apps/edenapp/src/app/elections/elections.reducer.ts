import { createReducer, on } from '@ngrx/store';
import { Elections, IElection, IPosition } from './Election';
import * as ElectionsActions from './elections.actions';

export const electionsFeatureKey = 'electionsState';

export interface State {
  lists: Elections;
  position: IPosition;
  election: IElection;
  listLoaded: boolean;
  error: any;
}

export const initialState: State = {
  lists: [],
  position: null,
  election: null,
  listLoaded: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ElectionsActions.CreateNewElectionSuccess, (state, { election }) => {
    return {
      ...state,
      currentElection: election._id,
      currentPosition: null,
      lists: [...state.lists, election],
    };
  }),
  on(ElectionsActions.loadElectionsSuccess, (state, { data }) => {
    return {
      ...state,
      lists: data,
      listLoaded: true,
    };
  }),
  on(ElectionsActions.getElectionSuccess, (state, { election }) => {
    return {
      ...state,
      election,
    };
  }),
  on(ElectionsActions.removePostsSuccess, (state, { data }) => {
    const updatedElections = state.lists.concat();
    updatedElections[
      updatedElections.findIndex(elec => elec._id === data._id)
    ] = data;
    return {
      ...state,
      lists: updatedElections,
    };
  }),
  on(ElectionsActions.updateElectionSuccess, (state, { election }) => {
    const updatedElections = state.lists.concat();
    updatedElections[
      updatedElections.findIndex(elec => elec._id === election._id)
    ] = election;
    return {
      ...state,
      lists: updatedElections,
    };
  }),
  on(ElectionsActions.addCandidateSuccess, (state, { election }) => {
    const updatedElections = state.lists.concat();
    updatedElections[
      updatedElections.findIndex(elec => elec._id === election._id)
    ] = election;
    return {
      ...state,
      lists: updatedElections,
    };
  }),
  on(ElectionsActions.getPositionSuccess, (state, { position }) => {
    return {
      ...state,
      position,
    };
  }),
);
