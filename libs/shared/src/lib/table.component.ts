import { Component, OnInit } from '@angular/core';
import { TableHeader } from './shared';

@Component({
  selector: 'eden-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  headers: TableHeader[] = [];
  data = [];
}
