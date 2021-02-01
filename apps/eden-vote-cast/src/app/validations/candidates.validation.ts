import { FormArray, FormGroup } from '@angular/forms';

export const SameRepeatValidation = (fArray: FormArray) => {

  const values:string[] = [];

  for(let i=0;i< fArray.controls.length; i++) {
    const firstName = fArray.controls[i].get('firstName').value;
    const lastName = fArray.controls[i].get('lastName').value;

    values.push(`${lastName} ${firstName}`);
  }

  const check = values.every((c, idx, a) => {
    if(idx !== idx) {
      return a.includes(c);
    }
  });

  console.log(check);

  return {
    sameCandidate: null
  }
}
