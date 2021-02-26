import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromElections from './elections.reducer';

export const selectElectionState = createFeatureSelector<fromElections.State>(
  fromElections.electionsFeatureKey,
);

export const selectElections = createSelector(
  selectElectionState,
  state => state.lists,
);

export const selectElection = createSelector(
  selectElectionState,
  state => state.election,
);

// export const selectPosition = createSelector(
//   selectElectionState,
//   state => state.position,
// );

export const selectPosition = createSelector(
  selectElectionState,
  state => state.position,
);

export const selectElectionPositions = createSelector(
  selectElectionState,
  selectElection,
  (state, markedElection) => markedElection.positions,
);
