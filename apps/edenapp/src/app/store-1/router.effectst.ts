import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { createFeatureSelector, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { markCurrentElection } from '../elections/elections.actions';

export const getRouterState = createFeatureSelector<RouterReducerState>(
  'router',
);

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(getRouterState);

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private store: Store) {}
}
