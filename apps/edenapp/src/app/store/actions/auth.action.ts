import { createAction, props } from '@ngrx/store';
import { AuthDto } from '../../models/Login';
import { AuthenticatedUser } from '../../models/user';

enum AuthActionTypes {
  LOGIN_USER = '[AUTH] Login User',
  LOGOUT_USER = '[AUTH] Logout User',
  LOGOUT_USER_SUCESS = '[AUTH] Logout User Success',
  REGISTER_USER = '[AITH] Register User',
  SET_CURRENT_USER = '[AUTH] Set current user',
  SET_INITIAL_USER = '[AUTH] Set initial user',
}

export const LoginUser = createAction(
  AuthActionTypes.LOGIN_USER,
  props<{ payload: AuthDto }>(),
);

export const LogoutUser = createAction(AuthActionTypes.LOGOUT_USER);
export const LogoutUserSuccess = createAction(
  AuthActionTypes.LOGOUT_USER_SUCESS,
);

export const RegisterUser = createAction(
  AuthActionTypes.REGISTER_USER,
  props<{ payload: AuthDto }>(),
);

export const SetInitialUser = createAction(AuthActionTypes.SET_INITIAL_USER);

export const SetCurrentUser = createAction(
  AuthActionTypes.SET_CURRENT_USER,
  props<{ payload: AuthenticatedUser }>(),
);
