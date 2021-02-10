import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSettings from '../settings.reducer';
import { LoadSubjects } from '../settings.actions';

@Component({
  selector: 'evc-subjects',
  template: `

  <div class="container mt-4">
      <div class="row">
        <div class="col-5">
          <evc-subjects-list></evc-subjects-list>
        </div>
        <div class="col-7">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class SubjectsComponent implements OnInit {
  constructor(private store: Store<fromSettings.State>) {}
  ngOnInit(): void {
    this.store.dispatch(LoadSubjects());
  }
}
