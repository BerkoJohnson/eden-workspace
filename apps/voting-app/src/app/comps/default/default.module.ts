import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MaterialModule } from '../../material/material.module';

import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DefaultComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [DefaultComponent, RouterModule],
  providers: [AuthService],
})
export class DefaultModule {}
