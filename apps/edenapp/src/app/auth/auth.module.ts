import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { LoginGuard } from './login.guard';
import { RoleAccessGuard } from './role-access.guard';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule, LoginComponent],
  providers: [AuthService, LoginGuard, RoleAccessGuard],
})
export class AuthModule { }
