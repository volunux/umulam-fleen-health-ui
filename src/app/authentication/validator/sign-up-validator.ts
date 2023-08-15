import {AbstractControl, ValidatorFn} from "@angular/forms";

export function profileTypeValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;

    if (!allowedValues.includes(value)) {
      return {'invalidProfileType': {value}};
    }

    return null;
  };
}
