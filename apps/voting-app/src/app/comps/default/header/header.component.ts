import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() deviceXs: boolean;
  @Output() loggedOut = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

  logout() {
    this.loggedOut.emit();
  }

}
