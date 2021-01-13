import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  user: {email: string, role: string}
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

}
