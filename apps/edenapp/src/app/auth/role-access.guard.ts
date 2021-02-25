import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES } from '../models/roles.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleAccessGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = (route.data?.roles as ROLES[]) || [];
    const redirectUrl = route.data?.redirectUrl || '';

    const user = this.authService.token_payload;

    const hasAccess = roles.some(role => user.role === role);

    if (!hasAccess) {
      this.router.navigate([`/${redirectUrl}`]);
      return false;
    }
    return true;
  }
}
