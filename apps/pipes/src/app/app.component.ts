import { Component } from '@angular/core';

@Component({
  selector: 'eden-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name: string;
  date: string;
  amount: string;
  height: number;
  miles: number;

  car = {
    make: 'Toyota',
    model: 'Camry',
    year: 2000,
  };



  onNameChange(value: string) {
    this.name = value;
  }
  onDateChange(value: string) {
    this.date = value;
  }
  onAmountChange(value: string) {
    this.amount = value;
  }
  onHeightChange(value: string) {
    this.height = parseFloat(value);
  }
  onMilesChange(value: string) {
    this.miles = parseFloat(value);
  }
}
