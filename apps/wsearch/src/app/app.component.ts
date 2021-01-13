import { Component } from '@angular/core';
import { WsService } from './ws.service';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ws: WsService) {}

  onTerm(value: string) {
   const results = this.ws.search(value);
   console.log(results);
  }
}
