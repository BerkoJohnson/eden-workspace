import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { errorReducer, ErrorState } from './reducers/error.reducer';
import { AuthEffect } from './effects/auth.effect';
import { authReducer, AuthState } from './reducers/auth.reducer';

export interface AppState {
  errorState: ErrorState;
  authState: AuthState;
}

const reducers: ActionReducerMap<AppState> = {
  errorState: errorReducer,
  authState: authReducer,
};

const effects = [AuthEffect];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
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
