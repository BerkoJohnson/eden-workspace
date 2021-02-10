import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SetCurrentDepartmentID } from '../../settings.actions';
import { IDepartmentPayload } from '../../settings.model';
import * as fromSettings from '../../settings.reducer';


@Component({
  selector: 'evc-departments-list',
  templateUrl: './dept-list.component.html',
})
export class DepartmentsListComponent implements OnInit {
  departments$: Observable<IDepartmentPayload[]>;

  constructor(private store: Store<fromSettings.State>, private router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

    this.departments$ = this.store.select(fromSettings.SelectLoadedDepartments);
  }

  trackByKey(index: number, obj: IDepartmentPayload) {
    return obj._id;
  }

  mark(subjID: string) {
    console.log(subjID);
  }


  editDepartment(deptID: string) {
    if(deptID) {
      this.store.dispatch(SetCurrentDepartmentID({id: deptID}));
      this.router.navigate(['settings/departments/edit']);
    }
  }
}
