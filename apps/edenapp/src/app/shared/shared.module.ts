import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const comps = [
  HeaderComponent,
  PageHeaderComponent,
  SidenavComponent,
  SidebarComponent,
];

@NgModule({
  declarations: [comps],
  imports: [CommonModule,RouterModule],
  exports: [comps, RouterModule],
})
export class SharedModule {}
