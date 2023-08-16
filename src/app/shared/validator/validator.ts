import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {isFalsy, isTruthy} from "../util/shared-util";

export function enumTypeValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      const value = control.value;

      if (!allowedValues.includes(value)) {
        return {'invalidType': value, allowedValues};
      }
    }
    return null;
  };
}


export function fieldsMatchValidator(fieldName1: string, fieldName2: string): ValidatorFn {
  return (formGroup: AbstractControl): {[key: string]: any} | null => {
    const field1: AbstractControl | any = formGroup.get(fieldName1);
    const field2: AbstractControl | any = formGroup.get(fieldName2);

    if (isFalsy(field1) || isFalsy(field2)) {
      return null;
    }

    if (field1.value !== field2.value) {
      field2.setErrors({ 'mismatch': true });
      return { 'mismatch': true };
    } else {
      field2.setErrors(null);
      return null;
    }
  };
}

export function dateOfBirthValidator(pattern: RegExp) {
  return (control: FormControl): ValidationErrors | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      if (!pattern.test(control.value)) {
        return { invalidDateFormat: true};
      }
    }

    return null;
  };
}

export function pastDateValidator(control: FormControl): ValidationErrors | null {
  if (isTruthy(control) && isTruthy(control.value)) {
    const enteredDate: Date = new Date(control.value);
    const today: Date = new Date();

    if (enteredDate.getFullYear() > today.getFullYear()) {
      return { pastDate: true};
    }
  }

  return null;
}

export function futureDateValidator(control: FormControl): ValidationErrors | null {
  if (isTruthy(control) && isTruthy(control.value)) {
    const enteredDate: Date = new Date(control.value);
    const today: Date = new Date();

    if (enteredDate.getFullYear() < today.getFullYear()) {
      return { futureDate: true };
    }
  }
  return null;
}
