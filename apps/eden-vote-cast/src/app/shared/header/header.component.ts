import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticatedUser } from '../../models/user';

@Component({
  selector: 'evc-shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() signout = new EventEmitter<void>();

  @Input() loggedInUser: AuthenticatedUser;



  logout() {
    this.signout.emit();
  }
}
