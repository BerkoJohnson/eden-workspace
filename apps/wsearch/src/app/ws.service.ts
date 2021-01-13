import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }


  search(term: string) {
    return ['Search Results'];
  }
}
