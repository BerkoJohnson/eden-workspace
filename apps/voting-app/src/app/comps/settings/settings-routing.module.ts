import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROLES } from '../../models/roles.enum';
import { RoleAccessGuard } from '../auth/role-access.guard';
import { NewUserComponent } from './new-user/new-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'my-profile', component: UserProfileComponent },
      {
        path: 'lists',
        component: UsersListComponent,
        data: { roles: [ROLES.SUPERADMIN, ROLES.ADMIN], redirectUrl: 'users' },
        canActivate: [RoleAccessGuard],
      },
      // {
      //   path: '',
      //   redirectTo: 'lists',
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
