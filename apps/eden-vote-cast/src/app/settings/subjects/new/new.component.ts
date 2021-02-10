import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromSettings from '../../settings.reducer';
import {AddSubjects} from '../../settings.actions';

@Component({
  selector: 'evc-new-subject',
  templateUrl: './new.component.html',
})
export class NewSubjectComponent {
  form = this.fb.group(
    {
      subjects: this.fb.array([]),
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

  addSubjectGroup() {
    this.subjectArray.push(
      this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        type: ['Core', [Validators.required]],
      })
    );
  }

  get subjectArray() {
    return this.f.get('subjects') as FormArray;
  }

  get f() {
    return this.form;
  }

  addSubjects() {
    if (this.form.invalid) {
      return;
    }

    // Submit subjects array to backend

    this.store.dispatch(AddSubjects(this.form.value));
  }

  removeSubject(i: number) {
    this.subjectArray.removeAt(i);
  }
}
