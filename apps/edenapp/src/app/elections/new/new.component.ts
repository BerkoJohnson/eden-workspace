import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateNewElection } from '../elections.actions';
import * as fromElections from '../elections.reducer';
@Component({
  selector: 'evc-new-election',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewElectionComponent implements OnInit {
  form: FormGroup;
  defaultAcademicYear: string;
  submitted = false;
  alertSuccess = false;
  academicYearPattern: string | RegExp = /^202[1-9]{1}\/202[1-9]{1}/;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromElections.State>
  ) {}

  ngOnInit(): void {
    this.defaultAcademicYear = `${new Date().getFullYear()}/${
      new Date().getFullYear() + 1
    }`;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      academicYear: [
        this.defaultAcademicYear,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.academicYearPattern),
        ]),
      ],
      positions: this.fb.array([]),
    });
  }

  createElection() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(CreateNewElection({election: this.form.value}))
  }

  get f() {
    return this.form.controls;
  }

  get positionsArray() {
    return this.f['positions'] as FormArray;
  }

  addPosition() {
    const postionForm = this.fb.group({
      pos_name: ['', [Validators.required]],
    });
    this.positionsArray.push(postionForm);
  }

  resetForm() {
    this.form.reset();
  }

  removePosition(i: number) {
    this.positionsArray.removeAt(i);
  }
}
