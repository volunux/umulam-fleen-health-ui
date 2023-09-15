import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {equalsIgnoreCase, isFalsy, isTruthy, nonNull, validatePattern} from "../util/helpers";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {AnyProp, AnyRegEx, TwoArray} from "../type/base";
import {EntityExistsResponse} from "../response/entity-exists.response";
import {BETWEEN_DATE_TYPE, DATE_TYPE, NO_INPUT_KEY} from "../constant/enum-constant";
import {DATE, TIME_FORMAT, TWO_DATES} from "../util/format-pattern";

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

    const value: AnyProp | null = field1.value !== field2.value
      ? { mismatch: true, label1, label2 }
      : null;

    field2.setErrors(value);
    return value;
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

function parseTime(time: string, separator: string = ':'): TwoArray {
  if (isFalsy(time)) {
    return null;
  }

  const timeParts: string[] = time.split(separator);
  if (timeParts.length !== 2) {
    return null;
  }

  const hours: number = parseInt(timeParts[0], 10);
  const minutes: number = parseInt(timeParts[1], 10);

  return [hours, minutes];
}

export function minTimeValidator(minTime: string, pattern: string = TIME_FORMAT): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (nonNull(control) && nonNull(minTime)) {
      const inputTime = control.value;
      const inputTimeParsed: TwoArray | any = parseTime(inputTime);
      const minTimeParsed: TwoArray | any = parseTime(minTime);

      if (isFalsy(inputTimeParsed)) {
        return { timeFormatError: true, pattern };
      }

      const chosenHour: number = inputTimeParsed[0];
      const chosenMinute: number = inputTimeParsed[1];

      const requiredHour: number = minTimeParsed[0];
      const requiredMinute: number = minTimeParsed[1];

      if (minTimeParsed &&
          (inputTimeParsed[0] < requiredHour || (chosenHour === requiredHour && chosenMinute < requiredMinute))) {
        return { minTime: true, minTimeValue: minTime };
      }
    }

    return null;
  };
}

export function maxTimeValidator(maxTime: string, pattern: string = TIME_FORMAT): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (nonNull(control) && (nonNull(maxTime))) {
      const inputTime = control.value;
      const inputTimeParsed: TwoArray | any = parseTime(inputTime);
      const maxTimeParsed: TwoArray | any = parseTime(maxTime);

      if (isFalsy(inputTimeParsed)) {
        return { timeFormatError: true, pattern };
      }

      const chosenHour: number = inputTimeParsed[0];
      const chosenMinute: number = inputTimeParsed[1];
      const requiredHour: number = maxTimeParsed[0];
      const requiredMinute: number = maxTimeParsed[1];

      if (maxTimeParsed &&
          (chosenHour > requiredHour || (chosenHour === requiredHour && chosenMinute > requiredMinute))) {
        return { maxTime: true };
      }
    }

    return null;
  };
}

export function endTimeGreaterThanStartTimeValidator(startTimeFieldName: string, endTimeFieldName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startTimeControl: AbstractControl | any = formGroup?.get(startTimeFieldName);
    const endTimeControl: AbstractControl | any = formGroup?.get(endTimeFieldName);

    if (isFalsy(startTimeControl) || isFalsy(endTimeControl)) {
      return null;
    }

    const startTime = startTimeControl.value;
    const endTime = endTimeControl.value;

    if (isFalsy(startTime) || isFalsy(endTime)) {
      return null;
    }

    const [startHours, startMinutes]: TwoArray | any = parseTime(startTime);
    const [endHours, endMinutes]: TwoArray | any = parseTime(endTime);

    if (endHours < startHours || (endHours === startHours && endMinutes <= startMinutes)) {
      return { endTimeGreaterThanStartTime: true };
    }

    return null;
  }
}

export function completeHourValidator(startTimeFieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startTimeCtrl: AbstractControl | any = control.parent?.get(startTimeFieldName);
    if (isFalsy(startTimeCtrl)) {
      return null;
    }

    const startTime = control.parent?.get(startTimeFieldName)?.value;
    const endTime: string = control.value;

    if (isFalsy(startTime) || isFalsy(endTime)) {
      return null;
    }

    const [startHours, startMinutes]: TwoArray | any = parseTime(startTime);
    const [endHours, endMinutes]: TwoArray | any = parseTime(endTime);

    const minuteDifference: number = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

    if (minuteDifference % 60 !== 0) {
      return { completeHourDifference: true };
    }

    return null;
  }
}
