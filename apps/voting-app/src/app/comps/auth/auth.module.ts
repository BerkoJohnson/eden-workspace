import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthLoginComponent } from './auth-login/auth-login.component';

@NgModule({
  declarations: [LoginComponent, AuthLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
