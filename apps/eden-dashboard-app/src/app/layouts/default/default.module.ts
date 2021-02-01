import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


import { SharedModule} from '../../shared/shared.module';

import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { PostsComponent } from '../../modules/posts/posts.component';

@NgModule({
  declarations: [DefaultComponent, DashboardComponent, PostsComponent],
  imports: [
  CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    SharedModule,
  ],
  exports: [RouterModule]
})
export class DefaultModule { }
