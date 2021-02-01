import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './settings-routing.module';
import { UsersService } from './users.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UsersListComponent,
    NewUserComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UsersRoutingModule,
    SharedModule,
  ],
  providers: [UsersService],
})
export class SettingsModule {}
