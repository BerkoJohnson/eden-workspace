import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FullwidthComponent } from './fullwidth.component';


@NgModule({
  declarations: [FullwidthComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [RouterModule, FullwidthComponent]
})
export class FullwidthModule { }
