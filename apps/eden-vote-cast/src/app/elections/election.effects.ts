import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  mergeMap,
  tap,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as ElectionActions from './elections.actions';
import { ElectionsService } from './elections.service';
import { Router } from '@angular/router';

@Injectable()
export class ElectionEffects {
  loadElections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ElectionActions.loadElections),
      concatMap(() =>
        this.electionService.getElections().pipe(
          map((data) => ElectionActions.loadElectionsSuccess({ data })),
          catchError((error) =>
            of(ElectionActions.loadElectionsFailure({ error }))
          )
        )
      )
    );
  });

  removePosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ElectionActions.removePosts),
      mergeMap(({ electionID, positions }) =>
        this.electionService.removePositions(electionID, positions).pipe(
          map((data) => ElectionActions.removePostsSuccess({ data })),
          catchError((error) =>
            of(ElectionActions.removePostsFailure({ error }))
          )
        )
      )
      // tap(() => this.router.navigate(['/elections/view']))
    );
  });
  updateElection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ElectionActions.updateElection),
      mergeMap(({ update, electionID }) =>
        this.electionService.update(update, electionID).pipe(
          map((data) =>
            ElectionActions.updateElectionSuccess({ election: data })
          ),
          catchError((error) =>
            of(ElectionActions.updateElectionFailure({ error }))
          )
        )
      ),
      tap(() => this.router.navigate(['/elections/view']))
    );
  });

  addNewCandidates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ElectionActions.addCandidate),
      switchMap(({ candidates, electionID }) =>
        this.electionService
          .addCandidates(candidates, electionID)
          .pipe(map(() => ElectionActions.loadElections()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private electionService: ElectionsService,
    private router: Router
  ) {}
}