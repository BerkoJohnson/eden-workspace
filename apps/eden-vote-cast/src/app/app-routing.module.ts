import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './auth/login.guard';

import { LoginComponent } from './auth/login/login.component';
import { RoleAccessGuard } from './auth/role-access.guard';
import { CantAccessPageComponent } from './cant-access-page/cant-access-page.component';
import { DefaultComponent } from './default/default.component';
import { FullwidthComponent } from './fullwidth/fullwidth.component';
import { HomeComponent } from './home/home.component';
import { ROLES } from './models/roles.enum';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: { requiresLogIn: true },
    canActivate: [LoginGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'no-access', component: CantAccessPageComponent },
      {
        path: 'users',
        data: { roles: [ROLES.SUPERADMIN, ROLES.ADMIN], redirectUrl: 'no-access' },
        canActivate: [RoleAccessGuard],
        loadChildren: () =>
          import('./users/user.module').then((mod) => mod.UserModule),
      },
      {
        path: 'elections',
        data: { roles: [ROLES.SUPERADMIN, ROLES.ADMIN], redirectUrl: 'no-access' },
        canActivate: [RoleAccessGuard],
        loadChildren: () =>
          import('./elections/elections.module').then((mod) => mod.ElectionsModule),
      },
    ],
  },
  {
    path: '',
    component: FullwidthComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
