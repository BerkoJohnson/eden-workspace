import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ModsHome',
  templateUrl: './ModsHome.component.html',
  styleUrls: ['./ModsHome.component.scss']
})
export class ModsHomeComponent implements OnInit {
  modalOpen = false;

  items = [
    {title: 'His Love', content: 'For God So Loved the world'},
    {title: 'His Mercies', content: 'His mercies endures forever'},
    {title: 'His Faithfulness', content: 'He is faithful'},
  ]
  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.modalOpen = !this.modalOpen;
  }
}
