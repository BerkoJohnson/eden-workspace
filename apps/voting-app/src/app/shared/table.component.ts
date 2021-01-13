import { Component, Input, OnInit } from '@angular/core';
import { TableHeader } from './shared';

@Component({
  selector: 'eden-workspace-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() classNames = '';
  @Input() headers: TableHeader[] = [];
  @Input() data = [];
}
