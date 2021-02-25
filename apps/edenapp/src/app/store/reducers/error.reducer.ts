import { createReducer, on } from '@ngrx/store';
import { AddError, RemoveError } from '../actions/error.actions';

export interface ErrorState {
  error: any;
}

const initialState: ErrorState = {
  error: null,
};

export const errorReducer = createReducer(
  initialState,
  on(AddError, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(RemoveError, state => {
    return {
      ...state,
      error: null,
    };
  }),
);
