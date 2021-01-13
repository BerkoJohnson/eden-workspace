import { Component, Input } from '@angular/core';

@Component({
  selector: 'eden-workspace-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() headers: { key: string; label: string }[] = [];
  @Input() data = [];

  /** Sorting by this order, first desc then asc */
  sortOrder = 'desc';

  /** Sorting by this key */
  sortKey = '';

  /** To know whether the data is sorted or not */
  sorted = false;

  /** Sort function takes only the
   * {key: string} as the argument
   * and returns the sorted list.
   */
  sort(key: string) {
    this.sortOrder =
      this.sortOrder === 'desc' && this.sortKey !== 'key' ? 'asc' : 'desc';
    this.sortKey = key;
    this.sorted = true;

    // sort method takes a compare fn
    this.data = this.data.sort((a, b) => {
      const aKey = a[key];
      const bKey = b[key];

      let sortValue = 0;

      if (aKey > bKey) {
        sortValue = 1;
      }

      if (aKey < bKey) {
        sortValue = -1;
      }

      return this.sortOrder === 'desc' ? sortValue : sortValue * -1;
    });
  }
}
