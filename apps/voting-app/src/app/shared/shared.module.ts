import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from './table.component';
import { TabComponent } from './tab/tab.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [TableComponent, TabComponent],
  exports: [TableComponent, TabComponent, RouterModule],
})
export class SharedModule {}
