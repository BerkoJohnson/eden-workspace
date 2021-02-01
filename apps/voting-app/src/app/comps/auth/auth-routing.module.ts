import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: AuthLoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
