import { Component, OnInit } from '@angular/core';
import { Stats } from '../../models/stats';
import { ImageItems } from '../../models/items';

@Component({
  selector: 'eden-workspace-views-home',
  templateUrl: './views-home.component.html',
  styleUrls: ['./views-home.component.scss'],
})
export class ViewsHomeComponent implements OnInit {
  stats: Stats = [
    { value: 22, label: '# of Users' },
    { value: 900, label: 'Revenue' },
    { value: 50, label: 'Reviews' },
  ];

  items: ImageItems = [
    { image: '/assets/couch.jpeg', title: 'Couch', description: 'This is a fantastic couch to sit on' },
    { image: '/assets/dresser.jpeg', title: 'Dresser', description: 'This is a great dresser to put stuff in' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
