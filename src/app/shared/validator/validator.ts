import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {equalsIgnoreCase, isFalsy, isTruthy, validatePattern} from "../util/helpers";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {AnyProp, AnyRegEx} from "../type/base";
import {EntityExistsResponse} from "../response/entity-exists.response";
import {BETWEEN_DATE_TYPE, DATE_TYPE, NO_INPUT_KEY} from "../constant/enum-constant";
import {DATE, TWO_DATES} from "../util/format-pattern";

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

export function dateValidator(pattern: RegExp): ValidatorFn | any {
  return (control: FormControl): ValidationErrors | null => {
    if (isTruthy(control) && isTruthy(control.value)) {
      if (!pattern.test(control.value)) {
        return { invalidDateFormat: true};
      }
    }
    return null;
  };
}

export const dateOfBirthValidator = dateValidator;

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
        switchMap((value: string): Observable<any> => {
          if (isFalsy(value)) {
            return of(null);
          }
          return service.isEmailExists(value).pipe(
            map((response:EntityExistsResponse) => (response.exists ? { exists: true } : null)),
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


export function typeValidator(controlNames: [string, string], options: any[], propToFilter: string = 'key'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedKey = control.get(controlNames[0])?.value;
    const inputValue = control.get(controlNames[1])?.value;

    if (selectedKey && selectedKey !== NO_INPUT_KEY && inputValue !== undefined) {
      const config = options.find(option => option[propToFilter] === selectedKey);
      if (isTruthy(config)) {
        if (config.type === DATE_TYPE) {
          const isValidDate: boolean = validatePattern(DATE, inputValue);
          if (!isValidDate) {
            return { invalidDate: true };
          }
        } else if (config.type === BETWEEN_DATE_TYPE) {
          const isValidDate: boolean = validatePattern(TWO_DATES, inputValue);
          if (!isValidDate) {
            return { invalidDate: true };
          }
        }
      }
    }
    return null;
  };
}


export function isNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (isNaN(control.value)) {
    return { isNumber: true };
  }
  return null;
}
