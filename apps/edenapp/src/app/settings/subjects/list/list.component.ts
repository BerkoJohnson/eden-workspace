import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISubjectPayload } from '../../settings.model';

import * as fromSettings from '../../settings.reducer';

@Component({
  selector: 'evc-subjects-list',
  templateUrl: './list.component.html',
})
export class SubjectListComponent implements OnInit {
  subjects: ISubjectPayload[];

  markAll = false;
  showSubjects = 'all'
  constructor(private store: Store<fromSettings.State>) {}

  ngOnInit(): void {
    this.store.select(fromSettings.SelectLoadedSubjects).subscribe(
      subjs => this.subjects = subjs
    );
  }

  trackByKey(index: number, obj: ISubjectPayload) {
    return obj._id;
  }

  mark(subjID: string) {
    console.log(subjID);
  }

}
