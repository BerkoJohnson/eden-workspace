import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidates, Elections, IElection, IPosition } from './Election';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ElectionsService {
  selectedElectionSub = new BehaviorSubject<IElection>(null);
  selectedPositionSub = new BehaviorSubject<IPosition>(null);

  constructor(private http: HttpClient) {}

  get selectedElection() {
    return this.selectedElectionSub.asObservable();
  }

  get selectedPosition() {
    return this.selectedPositionSub.asObservable();
  }

  getElections(): Observable<Elections> {
    return this.http.get<Elections>('/api/elections');
  }

  createElection(electionData: IElection): Observable<IElection> {
    return this.http
      .post<IElection>('/api/elections', electionData)
      .pipe(tap((res) => this.selectedElectionSub.next(res)));
  }

  update(electionData: IElection, id: string) {
    return this.http
      .patch(`/api/elections/${id}`, electionData)
      .pipe(tap(() => this.getElection(id).subscribe()));
  }

  removePositions(electionId: string, markedPositions: string[]) {
    return this.http
      .patch('/api/elections/' + electionId + '/positions', markedPositions)
      .pipe(tap(() => this.getElection(electionId).subscribe()));
  }

  getElection(electionId: string): Observable<IElection> {
    return this.http
      .get<IElection>('/api/elections/' + electionId)
      .pipe(tap((res) => this.selectedElectionSub.next(res)));
  }

  addCandidates(positionID: string, candidates: Candidates) {
    return this.http.patch('/api/elections/positions/'+ positionID +'/candidates', candidates);
  }
}
