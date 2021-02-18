import { Component, Input } from '@angular/core';
import {Links} from '../../models/Link';

@Component({
  selector: 'evc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() links: Links;
}
