import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLES } from '../../models/roles.enum';
import { CreateUserDto } from '../../models/user';
import { ConfirmPasswordValidation } from '../../validations/confirm-password.validation';
import { UserService } from '../user.service';

@Component({
  selector: 'evc-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  alertSuccess = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            Validators.compose([
              Validators.required,
              Validators.pattern(
                /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
              ),
            ]),
          ],
          cpassword: [''],
        },
        { validators: [ConfirmPasswordValidation], updateOn: 'blur' }
      ),
      role: false,
    });
  }

  addUser() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { firstName, lastName, email, role, passwordGroup } = this.form.value;
    const userData: CreateUserDto = {
      firstName,
      lastName,
      email,
      password: passwordGroup.password,
      role: role === true ? ROLES.ADMIN : ROLES.USER,
    };

    this.userService.createUser(userData).subscribe(
      (_res) => {
        this.alertSuccess = true;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.alertSuccess = false;
          this.form.setErrors(
            {
              userExists: true,
            },
            { emitEvent: true }
          );
        }
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  resetForm() {
    this.form.reset();
  }
}
