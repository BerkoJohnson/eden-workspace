import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetInitialUser } from './store/actions/auth.action';
import { AppState } from './store/app-store.module';
@Component({
  selector: 'evc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(SetInitialUser());
  }
}
