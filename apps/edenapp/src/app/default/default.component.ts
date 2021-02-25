import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Links } from '../models/Link';
import { AuthenticatedUser } from '../models/user';
import { LogoutUser } from '../store/actions/auth.action';
import { AppState } from '../store/app-store.module';

@Component({
  selector: 'evc-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  links: Links = [
    { href: 'users', title: 'Users' },
    { href: 'elections', title: 'Elections' },
    { href: 'settings', title: 'School Setup' },
  ];

  user$: Observable<AuthenticatedUser>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.authState.user);
  }

  logout() {
    this.store.dispatch(LogoutUser());
  }
}
