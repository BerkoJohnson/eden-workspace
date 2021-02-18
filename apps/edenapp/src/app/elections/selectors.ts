import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromElections from './elections.reducer';

export const selectElectionState = createFeatureSelector<fromElections.State>(
  fromElections.electionsFeatureKey,
);

export const selectElections = createSelector(
  selectElectionState,
  state => state.lists,
);

export const selectCurrentElectionID = createSelector(
  selectElectionState,
  state => state.currentElection,
);

export const selectMarkedElection = createSelector(
  selectElectionState,
  selectCurrentElectionID,
  (state, id) => {
    return state.lists.find(election => election._id === id);
  },
);

export const selectCurrentPositionID = createSelector(
  selectElectionState,
  state => state.currentPosition,
);

export const selectMarkedPosition = createSelector(
  selectElectionState,
  selectMarkedElection,
  selectCurrentPositionID,
  (state, election, posId) => {
    return election.positions.find(pos => pos._id === posId);
  },
);

export const selectElectionPositions = createSelector(
  selectElectionState,
  selectMarkedElection,
  (state, markedElection) => markedElection.positions,
);
