import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IElection } from '../Election';
import { updateElection } from '../elections.actions';
import { selectMarkedElection } from '../selectors';

@Component({
  selector: 'evc-edit-election',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditElectionComponent implements OnInit {
  selectedElection: IElection;
  form = this.createForm();
  defaultAcademicYear: string;
  submitted = false;
  alertSuccess = false;
  academicYearPattern: string | RegExp = /^202[1-9]{1}\/202[1-9]{1}/;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(selectMarkedElection).subscribe(
      (election) => (this.selectedElection = election)
    );

    if (!this.selectedElection) {
      this.router.navigate(['elections']);
      return;
    }

    this.form.patchValue({
      title: this.selectedElection.title,
      academicYear: this.selectedElection.academicYear,
    });

    for (let i = 0; i < this.selectedElection.positions.length; i++) {
      this.addPosition(
        this.selectedElection.positions[i]._id,
        this.selectedElection.positions[i].pos_name
      );
    }
    this.form.updateValueAndValidity({ emitEvent: true });
  }

  createForm() {
    return this.fb.group({
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

  updateElection() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(updateElection({update: this.form.value, electionID: this.selectedElection._id}))
  }

  get f() {
    return this.form.controls;
  }

  get positionsArray() {
    return this.f['positions'] as FormArray;
  }

  addPosition(id = '', pos_name = '') {
    const postionForm = this.fb.group({
      _id: id,
      pos_name: [pos_name, [Validators.required]],
    });
    this.positionsArray.push(postionForm);
  }

  resetForm() {
    this.form.reset();
  }

  removePosition(i: number, _id: string) {
    this.positionsArray.removeAt(i);
  }
}
