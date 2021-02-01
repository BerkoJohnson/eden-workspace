import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'evc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if(this.auth.validateUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  submitLogin() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.form.setErrors({
          invalidCredentials: true
        }, {emitEvent: true})
        this.router.navigate([this.returnUrl || '/']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400 ||  error.status === 401) {
          this.form.setErrors({
            invalidCredentials: true
          }, {emitEvent: true})
        }
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
