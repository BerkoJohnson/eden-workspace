import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Elections } from '../Election';

@Component({
  selector: 'evc-list-elections',
  templateUrl: './list-elections.component.html',
  styleUrls: ['./list-elections.component.scss'],
})
export class ListElectionsComponent {
  @Output() selectElection = new EventEmitter<string>();
  @Input() elections: Observable<Elections>;
  @Input() selectedElection: Observable<string>;

  select(election: string) {
    this.selectElection.emit(election)
  }

  constructor(private router: Router) {}


  view(id: string) {
    this.router.navigate(['elections',id]);
  }
}
