import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadDepartments, LoadSubjects } from '../settings.actions';
import * as fromSettings from '../settings.reducer';

@Component({
  selector: 'evc-departments',
  template: `
    <div class="mt-4">
      <div class="row">
        <div class="col-sm-5 col-md-4">
          <evc-departments-list></evc-departments-list>
        </div>
        <div class="col-sm-7 col-md-4">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class DepartmentsComponent implements OnInit {
  constructor(private store: Store<fromSettings.State>) {}

  ngOnInit(): void {
    this.store.dispatch(LoadSubjects());
    this.store.dispatch(LoadDepartments());
  }
}
