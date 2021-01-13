import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { days, months, years } from '../../../shared/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'eden-workspace-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;


  daysSubject = new BehaviorSubject<number[]>(this.generateNumbers(31));
  months: {
    label: string;
    noOfDays: number;
  }[] = [
    { label: 'January', noOfDays: 31 },
    { label: 'February', noOfDays: 28 },
    { label: 'March', noOfDays: 31 },
    { label: 'April', noOfDays: 30 },
    { label: 'May', noOfDays: 31 },
    { label: 'June', noOfDays: 30 },
    { label: 'July', noOfDays: 31 },
    { label: 'August', noOfDays: 31 },
    { label: 'September', noOfDays: 30 },
    { label: 'October', noOfDays: 31 },
    { label: 'November', noOfDays: 30 },
    { label: 'December', noOfDays: 31 },
  ];
  years: number[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
    })
  }

  get noofdays() {
    return this.daysSubject.asObservable();
  }
  ngOnInit(): void {
    this.years = this.generateNumbers(2021, 1960);
  }

  onChangeMonth(value: string) {
    const m = this.months.find((m) => m.label === value);
    this.daysSubject.next(this.generateNumbers(m.noOfDays));
  }

  generateNumbers(end: number, start = 1) {
    const daysArr = [];
    for (let i = start; i < end + 1; i++) {
      daysArr.push(i);
    }

    return daysArr;
  }

  submit() {
    this.submitted = true;
    console.log(this.form.value);
  }


  get f() {
    return this.form.controls;
  }
}
