import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';


export interface Authenticate {
  email: string;
  password: string;
}



@Component({
  selector: 'vt-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent  implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authService.validateUser()) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          // ),
        ],
      ],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }


  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl || '/dashboard']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
