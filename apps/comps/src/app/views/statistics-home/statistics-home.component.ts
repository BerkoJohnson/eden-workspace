import { Component, Input, OnInit } from '@angular/core';
import {Stats} from '../../models/stats';

@Component({
  selector: 'eden-workspace-statistics-home',
  templateUrl: './statistics-home.component.html',
  styleUrls: ['./statistics-home.component.scss']
})
export class StatisticsHomeComponent implements OnInit {

  @Input() data:Stats  = [];

  constructor() { }

  ngOnInit(): void {
  }

}
