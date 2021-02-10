import { createAction, props } from '@ngrx/store';
import {
  IDepartmentBase,
  IDepartmentPayload,
  ISubjectBase,
  ISubjectPayload,
} from './settings.model';

export const LoadSubjects = createAction('[Subjects] Load All Subjects');
export const LoadSubjectsSuccess = createAction(
  '[Subjects] Load All Subjects Success',
  props<{ data: ISubjectPayload[] }>()
);

export const LoadSubjectsFailure = createAction(
  '[Subjects] Load All Subjects Failure',
  props<{ error: any }>()
);

export const SetCurrentSubjectID = createAction(
  '[Subjects] Setting Current Subject ID',
  props<{ id: string }>()
);

export const AddSubjects = createAction(
  '[Subjects] Add New Subjects',
  props<{ subjects: ISubjectBase[] }>()
);
export const AddSubjectsSuccess = createAction(
  '[Subjects] Add New Subjects Success',
  props<{ data: ISubjectPayload[] }>()
);
export const AddSubjectsFailure = createAction(
  '[Subjects] Add New Subjects Failure',
  props<{ error: any }>()
);

export const LoadDepartments = createAction(
  '[Departments] Load All Departments'
);
export const LoadDepartmentsSuccess = createAction(
  '[Departments] Load All Departments Success',
  props<{ data: IDepartmentPayload[] }>()
);

export const LoadDepartmentsFailure = createAction(
  '[Departments] Load All Departments Failure',
  props<{ error: any }>()
);

export const SetCurrentDepartmentID = createAction(
  '[Departments] Setting Current Department ID',
  props<{ id: string }>()
);

export const AddDeparment = createAction(
  '[Deparment] Add New Deparment',
  props<{ data: IDepartmentBase }>()
);
export const AddDeparmentSuccess = createAction(
  '[Deparment] Add New Deparment Success',
  props<{ data: IDepartmentPayload[] }>()
);
export const AddDeparmentFailure = createAction(
  '[Deparment] Add New Deparment Failure',
  props<{ error: any }>()
);

export const DeleteDepartment = createAction(
  '[Deparment] Delete Deparment',
  props<{ id: string }>()
);

export const DeleteDepartmentSuccess = createAction(
  '[Deparment] Delete Deparment Success',
  props<{ data: IDepartmentPayload }>()
);

export const DeleteDepartmentFailure = createAction(
  '[Deparment] Delete Deparment Failure',
  props<{ error: any }>()
);
