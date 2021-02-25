import { createAction, props } from '@ngrx/store';

enum ErrorActionTypes {
  ADD_ERROR = '[ERROR] Add Error',
  REMOVE_ERROR = '[ERROR] Remove Error',
}

export const AddError = createAction(
  ErrorActionTypes.ADD_ERROR,
  props<{ error: any }>(),
);

export const RemoveError = createAction(ErrorActionTypes.REMOVE_ERROR);
