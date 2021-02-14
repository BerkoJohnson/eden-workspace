import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'epg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}
  items: MenuItem[];

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'File',
        items: [
          { label: 'New', icon: PrimeIcons.PLUS },
          { label: 'Open', icon: PrimeIcons.DOWNLOAD },
        ],
      },
      {
        label: 'Edit',
        items: [
          { label: 'Undo', icon: PrimeIcons.REFRESH },
          { label: 'Redo', icon: PrimeIcons.UNDO },
        ],
      },
    ];
  }
}
