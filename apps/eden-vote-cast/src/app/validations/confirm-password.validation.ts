import { FormGroup } from '@angular/forms';

export const ConfirmPasswordValidation = (f: FormGroup) => {
  return f.get('password').value === f.get('cpassword').value
    ? null
    : {
        passwordMismatch: true,
      };
};
