import { IDepartmentPayload, ISubjectPayload } from './settings.model';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as fromActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface State {
  subjects: ISubjectPayload[];
  areSubjectsLoaded: boolean;
  currentSubjectID: string;
  departments: IDepartmentPayload[];
  areDepartmentsLoaded: boolean;
  currentDepartmentID: string;
  error: any;
}

export const initialState: State = {
  subjects: [],
  areSubjectsLoaded: false,
  currentSubjectID: null,
  departments: [],
  areDepartmentsLoaded: false,
  currentDepartmentID: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(fromActions.LoadSubjectsSuccess, (state, { data }) => {
    return {
      ...state,
      areSubjectsLoaded: true,
      subjects: [...state.subjects, ...data],
    };
  }),
  on(fromActions.LoadSubjectsFailure, (state, { error }) => {
    return {
      ...state,
      areSubjectsLoaded: false,
      error,
    };
  }),
  on(fromActions.SetCurrentSubjectID, (state, { id }) => {
    return {
      ...state,
      currentSubjectID: id,
    };
  }),
  on(fromActions.AddSubjectsSuccess, (state, { data }) => {
    return {
      ...state,
      subjects: [...state.subjects, ...data],
    };
  }),
  on(fromActions.AddSubjectsFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(fromActions.LoadDepartmentsSuccess, (state, { data }) => {
    return {
      ...state,
      areDepartmentsLoaded: true,
      departments: data,
    };
  }),
  on(fromActions.LoadDepartmentsFailure, (state, { error }) => {
    return {
      ...state,
      areDepartmentsLoaded: false,
      error,
    };
  }),
  on(fromActions.SetCurrentDepartmentID, (state, { id }) => {
    return {
      ...state,
      currentDepartmentID: id,
    };
  }),
  on(fromActions.AddDeparmentSuccess, (state, { data }) => {
    return {
      ...state,
      departments: [...state.departments, data],
    };
  }),
  on(fromActions.AddDeparmentFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
  on(fromActions.DeleteDepartmentSuccess, (state, { data }) => {
    
    return {
      ...state,
      departments: [...state.departments, data],
    };
  }),
  on(fromActions.DeleteDepartmentFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);

export const SelectSettingsState = createFeatureSelector<State>(
  settingsFeatureKey
);

export const SelectLoadedSubjects = createSelector(
  SelectSettingsState,
  (state) => state.subjects
);

export const SelectAreSubjectsLoaded = createSelector(
  SelectSettingsState,
  (state) => state.areSubjectsLoaded
);

export const SelectCurrentSubjectID = createSelector(
  SelectSettingsState,
  (state) => state.currentSubjectID
);

export const SelectCurrentSubject = createSelector(
  SelectSettingsState,
  SelectCurrentSubjectID,
  (s1, s2) => s1.subjects.find((subj) => subj._id === s2)
);

export const SelectLoadedDepartments = createSelector(
  SelectSettingsState,
  (state) => state.departments
);

export const SelectAreDepartmentsLoaded = createSelector(
  SelectSettingsState,
  (state) => state.areDepartmentsLoaded
);

export const SelectCurrentDepartmentID = createSelector(
  SelectSettingsState,
  (state) => state.currentDepartmentID
);

export const SelectCurrentDepartment = createSelector(
  SelectSettingsState,
  SelectCurrentDepartmentID,
  (s1, s2) => s1.departments.find((dept) => dept._id === s2)
);
