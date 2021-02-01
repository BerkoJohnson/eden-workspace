import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [RouterModule, DefaultComponent]
})
export class DefaultModule { }
