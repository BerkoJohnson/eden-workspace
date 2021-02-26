import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { errorReducer, ErrorState } from './reducers/error.reducer';
import { AuthEffect } from './effects/auth.effect';
import { authReducer, AuthState } from './reducers/auth.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
  errorState: ErrorState;
  authState: AuthState;
}

const reducers: ActionReducerMap<AppState> = {
  errorState: errorReducer,
  authState: authReducer,
};

// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>,
): ActionReducer<AppState> {
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

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

const effects = [AuthEffect];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    // StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Eden App Store',
    }),
    EffectsModule.forRoot(effects),
  ],
  declarations: [],
})
export class AppStoreModule {}
