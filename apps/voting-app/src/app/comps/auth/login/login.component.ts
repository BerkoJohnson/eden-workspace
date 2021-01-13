import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'eden-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
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
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          ),
        ],
      ],
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }


  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    console.log(this.returnUrl)
    this.authService.login(this.form.value).subscribe({
      next: () => {
        console.log(this.returnUrl)
        this.router.navigate([this.returnUrl || '/dashboard']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
