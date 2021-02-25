import { createReducer, on } from '@ngrx/store';
import { AuthenticatedUser } from '../../models/user';
import { SetCurrentUser, LogoutUserSuccess } from '../actions/auth.action';

export interface AuthState {
  user: AuthenticatedUser;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(SetCurrentUser, (state, { payload }) => {
    return { ...state, user: payload };
  }),
  on(LogoutUserSuccess, state => {
    return {
      ...state,
      user: null,
    };
  }),
);
