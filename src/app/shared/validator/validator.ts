import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {isFalsy, isTruthy} from "../util/helpers";
import {catchError, debounceTime, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";

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

export function emailExistsValidator(service: AuthenticationService): any {
  return (control: FormControl): Observable<any> => {
    const email = control.value;

    return of(email).pipe(
      debounceTime(3000),
      map(value => value.trim()),
      map(value => isFalsy(value) ? null : value),
      switchMap(value => {
        if (isFalsy(value)) {
          return of(null);
        }
        return service.isEmailExists(email).pipe(
          map(response => (response.exists ? { emailExists: true } : null)),
          catchError(() => of(null))
        );
      })
    );
  };
}
