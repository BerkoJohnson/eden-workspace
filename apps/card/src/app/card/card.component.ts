import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eden-workspace-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title = '';
  @Input() imgUrl = '';
  @Input() username = '';
  @Input() content = '';

  constructor() { }

  ngOnInit() {
  }

}
