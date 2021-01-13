import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gt-advanced-grids',
  templateUrl: './advanced-grids.component.html',
  styleUrls: ['./advanced-grids.component.scss'],
})
export class AdvancedGridsComponent implements OnInit {
  grids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  constructor() {}

  ngOnInit(): void {}
}
