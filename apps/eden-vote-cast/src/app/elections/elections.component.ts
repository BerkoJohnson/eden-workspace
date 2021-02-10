import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Elections } from './Election';
import { loadElections, markCurrentElection } from './elections.actions';
import { selectCurrentElectionID, selectElections } from './selectors';

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

    this.selectedElection$ = this.store.select(selectCurrentElectionID);

  }

  selected(value: string) {
    this.store.dispatch(markCurrentElection({ election: value }));
  }
}
