import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsService } from './settings.service';
import * as fromSettingsActions from './settings.actions';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class SettingsEffects {
  loadSubjects$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromSettingsActions.LoadSubjects),
      concatMap(() =>
        this.settingsService.getSubjects().pipe(
          map((data) => fromSettingsActions.LoadSubjectsSuccess({ data })),
          catchError((error) =>
            of(fromSettingsActions.LoadSubjectsFailure({ error }))
          )
        )
      )
    );
  });

  addSubjects$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromSettingsActions.AddSubjects),
      mergeMap(({ subjects }) =>
        this.settingsService.addSubjects(subjects).pipe(
          map((data) => {
            this.router.navigate(['settings/subjects']);
            return fromSettingsActions.AddSubjectsSuccess({ data });
          }),
          catchError((error) =>
            of(fromSettingsActions.AddSubjectsFailure({ error }))
          )
        )
      )
    );
  });

  loadDepartments$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromSettingsActions.LoadDepartments),
      concatMap(() =>
        this.settingsService.getDepartments().pipe(
          map((data) => fromSettingsActions.LoadDepartmentsSuccess({ data })),
          catchError((error) =>
            of(fromSettingsActions.LoadDepartmentsFailure({ error }))
          )
        )
      )
    );
  });

  addDepartment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromSettingsActions.AddDeparment),
      mergeMap(({ data }) =>
        this.settingsService.addDepartment(data).pipe(
          map((data) => {
            this.router.navigate(['settings/departments']);
            return fromSettingsActions.AddDeparmentSuccess({ data });
          }),
          catchError((error) =>
            of(fromSettingsActions.AddDeparmentFailure({ error }))
          )
        )
      )
    );
  });

  deleteDepartment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(fromSettingsActions.DeleteDepartment),
      mergeMap(({ id }) =>
        this.settingsService.deleteProgram(id).pipe(
          map((data) => {
            this.router.navigate(['settings/departments']);
            return fromSettingsActions.DeleteDepartmentSuccess({ data });
          }),
          catchError((error) =>
            of(fromSettingsActions.DeleteDepartmentFailure({ error }))
          )
        )
      )
    );
  });


  constructor(
    private action$: Actions,
    private settingsService: SettingsService,
    private router: Router
  ) {}
}
