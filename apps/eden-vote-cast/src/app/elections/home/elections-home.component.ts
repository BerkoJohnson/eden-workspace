import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IElection } from '../Election';
import { markCurrentPosition, removePosts } from '../elections.actions';
import { selectMarkedElection } from '../selectors';


@Component({
  selector: 'evc-elections-home',
  templateUrl: './elections-home.component.html',
  styleUrls: ['./elections-home.component.scss'],
})
export class ElectionsHomeComponent implements OnInit{
  selectedElection$: Observable<IElection>;
  constructor(private store: Store) {}

  markedPositions: string[] = [];
  ngOnInit(): void {
    this.selectedElection$ = this.store.select(selectMarkedElection);
  }

  markPost(marked: boolean, postId: string) {
    if (marked) {
      this.markedPositions.push(postId);
    } else {
      this.markedPositions = this.markedPositions.filter((p) => p !== postId);
    }
  }

  removeMarkedPosts(electionID: string, posId = '') {
    const positionsArray = posId ? [posId] : this.markedPositions;

    this.store.dispatch(removePosts({ electionID, positions: positionsArray }));
  }

  markPosition(posID: string) {
    this.store.dispatch(markCurrentPosition({position: posID}));
  }

  trackByKey(index: number, obj: any) {
    return obj._id;
  }
}
