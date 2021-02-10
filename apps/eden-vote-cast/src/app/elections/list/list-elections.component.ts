import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Elections, IElection } from '../Election';

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
}
