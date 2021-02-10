import { FormArray } from '@angular/forms';

export const SubjectRepeatedValidation = (c: FormArray) => {
  const formArrayValues = c.controls.map((control) => control.value);
  const duplicatesFound = formArrayValues.some(
    (x) => formArrayValues.indexOf(x) !== formArrayValues.lastIndexOf(x)
  );

  return duplicatesFound === true ? { subjectTitleRepeated: true } : null;
};
