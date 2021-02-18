import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';

import { UsersComponent } from './users.component';
import { UsersHomeComponent } from './home/user-home.component';
import { NewUserComponent } from './new/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: UsersHomeComponent },
      { path: 'new', component: NewUserComponent },
    ],
  },
];

@NgModule({
  declarations: [UsersComponent, NewUserComponent, UsersHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [UserService],
})
export class UserModule {}
