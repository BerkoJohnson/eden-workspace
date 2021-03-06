import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';

export interface RootState {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<RootState> = {
  router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(
  reducer: ActionReducer<RootState>,
): ActionReducer<RootState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [logger]
  : [];
