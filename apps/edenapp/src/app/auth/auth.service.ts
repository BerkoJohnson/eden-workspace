import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap, map } from 'rxjs/operators';
import { AuthDto } from '../models/Login';
import { AuthenticatedUser } from '../models/user';

export interface Token extends AuthenticatedUser {
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: AuthDto): Observable<AuthenticatedUser> {
    return this.http.post<{ token: string }>('/api/login', data).pipe(
      tap(res => {
        this.token = res.token;
      }),
      map(() => {
        return this.token_payload;
      }),
      shareReplay(),
    );
  }

  whoami() {
    // Send back token to validate on the server too.
    return this.http.get<{ token: string }>('/api/whoami').pipe(
      tap(res => {
        this.token = res.token;
      }),
      map(() => {
        return this.token_payload;
      }),
    );
  }

  get user(): AuthenticatedUser {
    return this.token_payload;
  }

  get token(): string {
    return localStorage.getItem('edenapp_token');
  }

  set token(result: string) {
    if (result) {
      localStorage.setItem('edenapp_token', result);
    } else {
      localStorage.clear();
    }
  }

  // Decode the token,
  // validate the token whether it has expired or not
  // returns payload as Token or null
  get token_payload(): Token {
    if (!this.token) {
      return null;
    }
    const payload = JSON.parse(window.atob(this.token.split('.')[1])) as Token;

    return payload.exp > Math.floor(Date.now() / 1000) ? payload : null;
  }

  logout(): Observable<boolean> {
    this.token = null;

    return of(true);
  }
}
