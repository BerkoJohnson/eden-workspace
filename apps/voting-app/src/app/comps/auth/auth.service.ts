import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { LoginModel } from '../../models/Login';

export interface LoginPayload {
  accessToken: string;
  expiresIn: number;
}

export interface Token {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginModel): Observable<LoginPayload> {
    return this.http.post<LoginPayload>('/api/auth/login', data).pipe(
      tap((res) => this.setSession(res)),
      shareReplay()
    );
  }

  get token(): string {
    return localStorage.getItem('vta-access-token')
  }

  setSession(authResult: LoginPayload) {
    const { accessToken, expiresIn } = authResult;
    const token_expires = this.timeNow() + expiresIn;

    localStorage.setItem('vta-access-token', accessToken);
    localStorage.setItem('vta-access-token-expires', `${token_expires}`);

    setTimeout(() => console.log(this.validateUser()), 100);
  }

  /** Checks if token exists, if not return null. if it exists return {email: string, role: string} */
  validateUser() {

    // if token is null;
    if (!this.decodeToken()) {
      return null;
    }

    const decoded = this.decodeToken();

    // check if token is expired
    if (this.timeNow() > decoded.exp) {
      return null;
    }

    // returns {email, role}
    return {
      email: decoded.email,
      role: decoded.role,
    };
  }

  private decodeToken(): Token | null {
    if (!this.token) {
      return null;
    }
    return JSON.parse(window.atob(this.token.split('.')[1]));
  }

  private timeNow() {
    return Math.floor(Date.now() / 1000);
  }
}
