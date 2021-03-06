import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Elections } from './Election';
import { loadElections } from './elections.actions';
import { selectElections } from './selectors';

@Component({
  selector: 'evc-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss'],
})
export class ElectionsComponent implements OnInit {
  elections$: Observable<Elections>;
  selectedElection$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadElections());
    this.elections$ = this.store.select(selectElections);
  }
}
