import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gt-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  boxs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  constructor() { }

  ngOnInit(): void {
  }

}
