import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullwidthComponent } from './fullwidth/fullwidth.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FullwidthComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [FullwidthComponent, RouterModule],
})
export class FullwidthModule { }
