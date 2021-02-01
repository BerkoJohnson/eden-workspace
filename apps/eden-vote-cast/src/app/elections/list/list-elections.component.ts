import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectionsService } from '../elections.service';

@Component({
  selector: 'evc-list-elections',
  templateUrl: './list-elections.component.html',
  styleUrls: ['./list-elections.component.scss'],
})
export class ListElectionsComponent implements OnInit{
  list$: Observable<any>;
  selectedElection = '';
  constructor(private electionsService: ElectionsService) {}

  ngOnInit(): void {
    this.list$ = this.electionsService.getElections();
  }


  markElection(election: any) {
    this.selectedElection = election?._id;
    this.electionsService.selectedElectionSub.next(election);
  }
}
