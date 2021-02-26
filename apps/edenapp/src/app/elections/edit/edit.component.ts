import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IElection } from '../Election';
import { updateElection } from '../elections.actions';
import { selectElection } from '../selectors';

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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectElection).subscribe(election => {
      if (election !== null) {
        this.form.patchValue({
          title: election.title,
          academicYear: election.academicYear,
        });

        for (let i = 0; i < election.positions.length; i++) {
          this.addPosition(
            election.positions[i]._id,
            election.positions[i].pos_name,
          );
        }
        this.form.updateValueAndValidity({ emitEvent: true });
        this.selectedElection = election;
      }
    });
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

    this.store.dispatch(
      updateElection({
        update: this.form.value,
        electionID: this.selectedElection._id,
      }),
    );
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
