import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginUser } from '../../store/actions/auth.action';
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
    private activatedRoute: ActivatedRoute,
    private store: Store,
  ) {
    if (this.auth.token_payload) {
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

    this.store.dispatch(LoginUser({ payload: this.form.value }));
  }

  get f() {
    return this.form.controls;
  }
}
