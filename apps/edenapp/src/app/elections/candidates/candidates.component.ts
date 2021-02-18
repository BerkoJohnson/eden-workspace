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
  form = this.addCandidateGroup();

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.positions$ = this.store.select(selectElectionPositions);
    this.store
      .select(selectCurrentElectionID)
      .subscribe(obs => (this.electionID = obs));
  }

  addCandidateGroup() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      room: ['', Validators.required],
      position: ['', Validators.required],
      nickname: ['', Validators.required],
      displayMessage: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

    // this.store.dispatch(
    //   addCandidate({ candidates, electionID: this.electionID })
    // );
  }
}
