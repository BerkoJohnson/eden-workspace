import { Component, Input, OnInit } from '@angular/core';
import { ImageItems } from '../../models/items';

@Component({
  selector: 'eden-workspace-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() items: ImageItems = [];

  constructor() { }

  ngOnInit(): void { }

}
