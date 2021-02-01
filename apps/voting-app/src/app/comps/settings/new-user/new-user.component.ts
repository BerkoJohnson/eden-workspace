import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vt-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;



  maxDate = new Date();
  minDate = new Date(1970, 0, 1);

  selectedValue = 'Male';
  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  submit() {
    this.submitted = true;
    console.log(this.form.value);
  }

  get f() {
    return this.form.controls;
  }

}
