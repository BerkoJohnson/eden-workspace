import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosition } from '../Election';
import { ElectionsService } from '../elections.service';

@Component({
  selector: 'evc-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewElectionComponent implements OnInit {
  // markedPost = '';
  selectedElection$: Observable<any>;
  constructor(private electionsService: ElectionsService) {}

  markedPositions: string[] = [];
  ngOnInit(): void {
    this.selectedElection$ = this.electionsService.selectedElection;
  }

  markPost(marked: boolean, postId: string) {
    if (marked) {
      this.markedPositions.push(postId);
    } else {
      this.markedPositions = this.markedPositions.filter((p) => p !== postId);
    }
  }

  removeMarkedPosts(electionID: string, posId= '') {
    if(!posId) {
      // delete all marked positions
      this.electionsService.removePositions(electionID, this.markedPositions).subscribe(ps => {
        // console.log()
      });
    } else {
      const posArray = [posId];
    this.electionsService.removePositions(electionID, posArray).subscribe();
    }

  }

  markPosition(pos: IPosition) {
    this.electionsService.selectedPositionSub.next(pos);
  }
  trackByKey(index: number, obj: any) {
    return obj._id;
  }
}
