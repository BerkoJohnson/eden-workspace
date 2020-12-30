import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROLES } from '../../models/roles.enum';
import { RoleAccessGuard } from '../auth/role-access.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  {
    path: 'lists',
    component: UsersListComponent,
    data: { roles: [ROLES.SUPERADMIN, ROLES.ADMIN], redirectUrl: 'users' },
    canActivate: [RoleAccessGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
