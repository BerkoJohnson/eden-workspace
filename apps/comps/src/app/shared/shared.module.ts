import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider/divider.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [DividerComponent, TableComponent,TabComponent],
  imports: [CommonModule, RouterModule],
  exports: [DividerComponent, TableComponent,TabComponent, RouterModule],
})
export class SharedModule {}
