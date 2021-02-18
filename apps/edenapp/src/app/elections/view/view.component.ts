import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IElection } from '../Election';
import {
  markCurrentElection,
  markCurrentPosition,
  removePosts,
} from '../elections.actions';
import { selectMarkedElection } from '../selectors';

@Component({
  selector: 'evc-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewElectionComponent implements OnInit {
  // markedPost = '';
  selectedElection$: Observable<IElection>;
  markedPositions: string[] = [];
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(markCurrentElection({ election: params.get('id') }));
    });
    setTimeout(
      () => (
        (this.selectedElection$ = this.store.select(selectMarkedElection)), 2000
      ),
    );
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

  markPosition(posID: string) {
    this.store.dispatch(markCurrentPosition({ position: posID }));
  }

  trackByKey(index: number, obj: any) {
    return obj._id;
  }
}
