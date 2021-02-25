import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IElection } from '../Election';
import { removePosts } from '../elections.actions';
import { selectElection, selectElections } from '../selectors';

@Component({
  selector: 'evc-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {
  selectedElection$: Observable<IElection>;
  elections$: Observable<IElection[]>;

  constructor(private store: Store) {}

  markedPositions: string[] = [];
  ngOnInit(): void {
    this.selectedElection$ = this.store.select(selectElection);
    this.elections$ = this.store.select(selectElections);
  }

  markPost(marked: boolean, postId: string) {
    if (marked) {
      this.markedPositions.push(postId);
    } else {
      this.markedPositions = this.markedPositions.filter(p => p !== postId);
    }
  }

  removeMarkedPosts(electionID: string, posId = '') {
    const positionsArray = posId ? [posId] : this.markedPositions;

    this.store.dispatch(removePosts({ electionID, positions: positionsArray }));
  }

  trackByKey(index: number, obj: any) {
    return obj._id;
  }
}
