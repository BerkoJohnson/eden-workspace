import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthenticatedUser } from '../../models/user';
import {
  LoginUser,
  LogoutUser,
  LogoutUserSuccess,
  SetCurrentUser,
  SetInitialUser,
} from '../actions/auth.action';
import { AddError } from '../actions/error.actions';

@Injectable()
export class AuthEffect {
  loginUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoginUser),
      mergeMap(({ payload }) =>
        this.authService.login(payload).pipe(
          map((user: AuthenticatedUser) => SetCurrentUser({ payload: user })),
          catchError(error => of(AddError({ error }))),
        ),
      ),
      tap(() => this.router.navigate(['/'])),
    ),
  );

  setInitialUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(SetInitialUser),
      switchMap(() =>
        this.authService
          .whoami()
          .pipe(map(u => SetCurrentUser({ payload: u }))),
      ),
    ),
  );

  logoutUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(LogoutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(isLoggedOut => {
            if (isLoggedOut) {
              return LogoutUserSuccess();
            }
          }),
        ),
      ),
      tap(() => this.router.navigate(['/login'])),
    ),
  );
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
