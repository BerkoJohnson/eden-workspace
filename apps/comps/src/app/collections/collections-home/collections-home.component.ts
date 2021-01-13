import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eden-workspace-collections-home',
  templateUrl: './collections-home.component.html',
  styleUrls: ['./collections-home.component.scss']
})
export class CollectionsHomeComponent implements OnInit {
  data = [
    {firstName: 'Johnson',lastName: 'Berko', age: 34, job: 'Teacher', gender: 'Male'},
    {firstName: 'Patience', lastName: 'Asiamah', age: 31, job: 'Trader', gender: 'Female'},
    {firstName: 'Luke', lastName: 'Nkum', age: 57, job: 'Pastor', gender: 'Male'},
    {firstName: 'Emelia', lastName: 'Aboagyewaa', age: 33, job: 'Trader', gender: 'Female'},
    {firstName: 'Diana', lastName: 'Aboagyewaa', age: 39, job: 'Hairdresser', gender: 'Female'},
  ];

  headers = [
    {key: 'firstName', label: 'First Name'},
    {key: 'lastName', label: 'Last Name'},
    {key: 'age', label: 'Age'},
    {key: 'job', label: 'Job'},
    {key: 'gender', label: 'Gender'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
