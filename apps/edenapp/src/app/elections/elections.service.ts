import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Elections, IElection, IPosition } from './Election';

@Injectable({ providedIn: 'root' })
export class ElectionsService {
  getPosition(electionId: string, positionId: string) {
    return this.http.get<IPosition>(
      `/api/elections/${electionId}/positions/${positionId}`,
    );
  }
  constructor(private http: HttpClient) {}

  getElections(): Observable<Elections> {
    return this.http.get<Elections>('/api/elections');
  }

  createElection(electionData: IElection): Observable<IElection> {
    return this.http.post<IElection>('/api/elections', electionData);
  }

  update(electionData: Partial<IElection>, id: string) {
    return this.http.patch<IElection>(`/api/elections/${id}`, electionData);
  }

  addCandidates(candidates: any, electionId: string) {
    return this.http.post(`/api/elections/${electionId}/candidates`, {
      candidates,
    });
  }

  removePositions(electionId: string, markedPositions: string[]) {
    return this.http.patch<IElection>(
      '/api/elections/' + electionId + '/positions',
      markedPositions,
    );
  }

  getElection(electionId: string) {
    return this.http.get<IElection>('/api/elections/' + electionId);
  }
}
