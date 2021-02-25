import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Elections } from '../Election';

@Component({
  selector: 'evc-list-elections',
  templateUrl: './list-elections.component.html',
  styleUrls: ['./list-elections.component.scss'],
})
export class ListElectionsComponent {
  @Input() elections: Observable<Elections>;
  @Input() selectedElection: Observable<string>;

  constructor(private router: Router) {}
}
