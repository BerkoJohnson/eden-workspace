import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'vt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: {email: string, role: string}
  constructor(private auth: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.auth.user;
  }

  openDialog() {
    const openedDialog = this.dialog.open(NewUserComponent);

  }

}
