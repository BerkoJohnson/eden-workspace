import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICandidate, IPosition } from '../Election';
import { getPosition } from '../elections.actions';
import { selectElection, selectPosition } from '../selectors';

@Component({
  selector: 'evc-position-details',
  templateUrl: './position-details.component.html',
  styleUrls: ['./position-details.component.scss'],
})
export class PositionDetailsComponent implements OnInit {
  selectedPosition$: Observable<IPosition>;
  markedCandidates: string[] = [];

  form = this.fb.group({
    candidates: this.fb.array([]),
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const positionId = this.route.snapshot.params['positionId'];

    this.store.select(selectElection).subscribe(election => {
      if (election && positionId) {
        this.store.dispatch(
          getPosition({ positionId, electionId: election._id }),
        );
      }
    });

    this.selectedPosition$ = this.store.select(selectPosition);
  }

  get candidatesArray() {
    return this.form.get('candidates') as FormArray;
  }

  addCandidate() {
    const group = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      room: ['', Validators.required],
      nickname: ['', Validators.required],
      displayMessage: ['', Validators.required],
    });

    this.candidatesArray.push(group);
  }

  removeCandidate(index: number) {
    this.candidatesArray.removeAt(index);
  }

  updatePosition(_id: string) {
    if (this.form.invalid) {
      return;
    }

    //  this.electionsService.addCandidates(_id, this.form.value).subscribe(d => console.log(d))
  }

  markCandidates(marked: boolean, candidateID: string) {
    if (marked) {
      this.markedCandidates.push(candidateID);
    } else {
      this.markedCandidates = this.markedCandidates.filter(
        c => c !== candidateID,
      );
    }
  }

  trackByKey(index: number, obj: ICandidate) {
    return obj._id;
  }

  removeMarkedCandidates(positionID, candID = '') {
    if (!candID) {
      // delete all marked candidates
      // this.electionsService.removePositions(electionID, this.markedPositions).subscribe(ps => {
      // });
    } else {
      // const candArray = [candID];
      // this.electionsService.removePositions(electionID, posArray).subscribe();
    }
  }
}
