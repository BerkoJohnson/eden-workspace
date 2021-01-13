import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, RouterModule],
  exports: [DefaultComponent, RouterModule],
  providers: [AuthService]
})
export class DefaultModule {}
