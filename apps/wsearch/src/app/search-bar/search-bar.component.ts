import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ws-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();

  term = '';
  constructor() {}

  ngOnInit(): void {
    console.log(this.term)
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    this.submitted.emit(this.term);
  }

}
