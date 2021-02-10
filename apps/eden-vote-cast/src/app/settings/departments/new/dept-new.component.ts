import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddDeparment } from '../../settings.actions';
import { ISubjectPayload } from '../../settings.model';
import * as fromSettings from '../../settings.reducer';

@Component({
  selector: 'evc-departments-new',
  templateUrl: './dept-new.component.html',
})
export class NewDepartmentComponent implements OnInit{
  submitted = false;
  subjectOptions$: Observable<ISubjectPayload[]>;

  form = this.fb.group(
    {
      title: ['', [Validators.required, Validators.minLength(3)]],
      hod: [''],
      subjects: this.fb.array([])
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

  subjectTypes = ['Core', 'Elective'];

  constructor(private fb: FormBuilder, private store: Store<fromSettings.State>) {}
  ngOnInit(): void {
    this.subjectOptions$ = this.store.select(fromSettings.SelectLoadedSubjects);
  }

  addSubject() {
    this.subjectArray.push(
      this.fb.control('', Validators.required)
    );
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

    this.store.dispatch(AddDeparment({data: this.form.value}));
  }

  removeSubject(i: number) {
    this.subjectArray.removeAt(i);
  }
}
