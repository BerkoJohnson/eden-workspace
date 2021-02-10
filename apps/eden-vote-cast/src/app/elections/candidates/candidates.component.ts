import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Positions } from '../Election';
import { addCandidate } from '../elections.actions';
import { selectCurrentElectionID, selectElectionPositions } from '../selectors';

@Component({
  selector: 'evc-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  positions$: Observable<Positions>;
  electionID: string;
  form = this.fb.group({
    candidates: this.fb.array([]),
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.positions$ = this.store.select(selectElectionPositions);
    this.store
      .select(selectCurrentElectionID)
      .subscribe((obs) => (this.electionID = obs));
  }

  get candidatesArray() {
    return this.form.get('candidates') as FormArray;
  }

  addCandidateGroup() {
    const group = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      room: ['', Validators.required],
      position: ['', Validators.required],
      nickname: ['', Validators.required],
      displayMessage: ['', Validators.required],
    });

    this.candidatesArray.push(group);
  }

  removeCandidate(index: number) {
    this.candidatesArray.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { candidates } = this.form.value;

    this.store.dispatch(
      addCandidate({ candidates, electionID: this.electionID })
    );
  }
}
