import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ICandidate, IPosition } from '../Election';
import { ElectionsService } from '../elections.service';

@Component({
  selector: 'evc-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {
  selectedPosition$: Observable<IPosition>;
  markedCandidates: string[] = [];

  form = this.fb.group({
    candidates: this.fb.array([]),
  });

  constructor(
    private electionsService: ElectionsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedPosition$ = this.electionsService.selectedPosition;
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

   this.electionsService.addCandidates(_id, this.form.value).subscribe(d => console.log(d))
  }

  markCandidates(marked: boolean, candidateID: string) {
    if (marked) {
      this.markedCandidates.push(candidateID);
    } else {
      this.markedCandidates = this.markedCandidates.filter(
        (c) => c !== candidateID
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
