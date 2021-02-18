import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddDeparment, DeleteDepartment } from '../../settings.actions';
import { IDepartmentPayload, ISubjectPayload } from '../../settings.model';
import * as fromSettings from '../../settings.reducer';
import {SubjectRepeatedValidation} from '../../../validations/subject-repeated.validation';

@Component({
  selector: 'evc-departments-edit',
  templateUrl: './dept-edit.component.html',
})
export class EditDepartmentComponent implements OnInit {
  submitted = false;
  subjectOptions$: Observable<ISubjectPayload[]>;
  department: IDepartmentPayload;

  form: FormGroup;

  subjectTypes = ['Core', 'Elective'];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromSettings.State>,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(3)]],
        hod: [''],
        subjects: this.fb.array([], [SubjectRepeatedValidation]),
      },
      {
        validators: [
          (f: FormGroup) => {
            const sArray = f.get('subjects') as FormArray;

            return sArray.controls.length === 0 ? { noSubject: true } : null;
          },
        ],
      }
    );
  }
  ngOnInit(): void {
    this.subjectOptions$ = this.store.select(fromSettings.SelectLoadedSubjects);
    this.store.select(fromSettings.SelectCurrentDepartment).subscribe((dep) => {
      if (!dep) {
        this.router.navigate(['settings/departments']);
        return;
      }

      this.form.patchValue({
        title: dep.title,
        hod: dep.hod,
      });

      // remove all subjectArray controls and insert new ones
      // let i = 0;
      // while (i < this.subjectArray.controls.length) {
      //   this.subjectArray.removeAt(i);
      //   console.log(i);
      //   i++;
      // }

      this.subjectArray.clear();

      for (let i = 0; i < dep.subjects.length; i++) {
        const control = this.fb.control(
          { value: dep.subjects[i]._id, disabled: true },
          Validators.required
        );
        this.subjectArray.push(control);
      }
      this.form.updateValueAndValidity({ emitEvent: true });

      this.department = dep;
    });
  }

  addSubject(id = '') {
    this.subjectArray.push(this.fb.control(id, [Validators.required]));
  }

  get subjectArray() {
    return this.f.get('subjects') as FormArray;
  }

  get f() {
    return this.form;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    // Submit department info to backend

    this.store.dispatch(AddDeparment({ data: this.form.value }));
  }

  removeSubject(i: number) {
    this.subjectArray.removeAt(i);
  }


  deleteDepartment() {
    this.store.dispatch(DeleteDepartment({id: this.department._id}));
  }
}
