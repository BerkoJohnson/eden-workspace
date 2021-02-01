import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './comps/auth/login.guard';
import { DashboardComponent } from './comps/dashboard/dashboard.component';
import { DefaultComponent } from './comps/default/default/default.component';
import { FullwidthComponent } from './comps/fullwidth/fullwidth/fullwidth.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        component: DefaultComponent,
        data: { requiresLogIn: true },
        canActivate: [LoginGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'settings',
            loadChildren: () =>
              import('./comps/settings/settings.module').then(
                (mod) => mod.SettingsModule
              ),
          },
          { path: 'dashboard', component: DashboardComponent },
        ],
      },
      {
        path: '',
        component: FullwidthComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./comps/auth/auth.module').then((mod) => mod.AuthModule),
          },
        ],
      },
    ]),
  ],
})
export class AppRoutingModule {}
