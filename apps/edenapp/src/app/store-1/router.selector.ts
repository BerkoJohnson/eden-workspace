import * as fromRouter from '@ngrx/router-store';
import * as fromStore from '.';
import { createSelector } from '@ngrx/store';

export const getRouterState = (state: fromStore.RootState) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state,
);
