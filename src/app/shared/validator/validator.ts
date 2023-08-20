import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {equalsIgnoreCase, isFalsy, isTruthy} from "../util/helpers";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {AnyProp, AnyRegEx} from "../type/base";

export function enumTypeValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      const value = control.value;

      if (!allowedValues.includes(value)) {
        return {invalidType: value, allowedValues};
      }
    }
    return null;
  };
}


export function fieldsMatchValidator(fieldName1: string, fieldName2: string, label1: string, label2: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const field1: AbstractControl | any = formGroup.get(fieldName1);
    const field2: AbstractControl | any = formGroup.get(fieldName2);

    if (isFalsy(field1) || isFalsy(field2)) {
      return null;
    }

    if (field1.value !== field2.value) {
      const value: AnyProp = { mismatch: true, label1, label2 };
      field2.setErrors(value);
      return value;
    } else {
      field2.setErrors(null);
      return null;
    }
  };
}

export function dateOfBirthValidator(pattern: RegExp): ValidatorFn | any {
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

export function phoneNumberValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (isTruthy(pattern) && isTruthy(control) && isTruthy(control.value)) {
      const phoneNumber = control.value;

      if (!pattern.test(phoneNumber)) {
        return { invalidPhoneNumber: true };
      }
    }
    return null;
  };
}

export function emailExistsValidator(service: AuthenticationService): any {
  let previousEmail: string;
  return (control: FormControl): Observable<any> => {
    if (isTruthy(control) && isTruthy(control.value)) {
      const email = control.value;

      if (equalsIgnoreCase(previousEmail, email)) {
        return of(null);
      }
      previousEmail = email;

      return of(email).pipe(
        map(value => value.trim()),
        map(value => isFalsy(value) ? null : value),
        switchMap(value => {
          if (isFalsy(value)) {
            return of(null);
          }
          return service.isEmailExists(email).pipe(
            map(response => (response.exists ? { exists: true } : null)),
            catchError(() => of(null))
          );
        })
      );
    }
    return of(null);
  };
}


export function passwordValidator(patterns: AnyRegEx, minLength: number = 8, maxLength: number = 24): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      const value = control.value;
      const { lowerCase: lowercaseRegex, upperCase: uppercaseRegex, digit: digitRegex, specialChar: specialCharRegex} = patterns;

      if (value.length < minLength || value.length > maxLength) {
        return { atLeastLength: true, minLength, maxLength };
      }

      if (!lowercaseRegex.test(value)) {
        return { atLeastLowercase: true };
      }

      if (!uppercaseRegex.test(value)) {
        return { atLeastUppercase: true };
      }

      if (!digitRegex.test(value)) {
        return { atLeastDigit: true };
      }

      if (!specialCharRegex.test(value)) {
        return { atLeastSpecialChar: true };
      }
    }
    return null;
  };
}


export function ageLimitValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      const value = control.value;
      const currentDate: Date = new Date();
      const birthDate: Date = new Date(value);
      const age: number = currentDate.getFullYear() - birthDate.getFullYear();
      if (age < minAge) {
        return { ageLimit: true, minAge };
      }
    }
    return null;
  };
}

export function codeValidator(pattern: RegExp, minLength: number = 1, maxLength: number = 8): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      let otpValue: string = control.value;
      if (!pattern.test(otpValue)) {
        return { invalidOTP: true };
      }

      if (otpValue.length < minLength || otpValue.length > maxLength) {
        return { atLeastLength: true, minLength, maxLength };
      }
    }
    return null;
  };
}
