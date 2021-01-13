import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eden-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPage = 0;

  images = [
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
    { title: 'Maame', url: '/assets/mama.jpg' },
    { title: 'Melvina', url: '/assets/melvina.jpg' },
    { title: 'Nat', url: '/assets/nat.jpg' },
    { title: 'michelle', url: '/assets/michelle.jpg' },
  ];

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }
}
