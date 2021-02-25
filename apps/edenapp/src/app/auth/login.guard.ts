import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiresLogin = route.data.requiresLogIn || false;
    // if route requires login
    if (requiresLogin) {
      // check if user is logged in, if not redirect to the login page
      // and append the previous url, so he can navigate back to that route
      if (!this.authService.token_payload) {
        const returnUrl = state.url;
        this.router.navigate(['/login'], { queryParams: { returnUrl } });
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
}
