import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'eden-workspace-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() items = [];
  openedItemIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }


  onItemClicked(index: number) {
    if(this.openedItemIndex  === index) {
      this.openedItemIndex = -1;
    } else {
      this.openedItemIndex = index;
    }
  }
}
