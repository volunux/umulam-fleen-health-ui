import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {equalsIgnoreCase, isFalsy, isTruthy, nonNull, validatePattern} from "../util/helpers";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {AnyProp, AnyRegEx, TwoArray} from "../type/base";
import {EntityExistsResponse} from "../response/entity-exists.response";
import {BETWEEN_DATE_TYPE, DATE_TYPE, NO_INPUT_KEY} from "../constant/enum-constant";
import {DATE, TIME_FORMAT, TWO_DATES} from "../util/format-pattern";


/**
   * Validator function to check if a control's value matches one of the allowed enum values.
   *
   * This validator function validates that a control's value matches one of the allowed values specified in an enum.
   * It's useful for ensuring that a select or dropdown input contains a valid enum value.
   *
   * @param allowedValues An array of strings representing the allowed enum values.
   *
   * @returns A validator function that returns a validation error object with the 'invalidType' and 'allowedValues' keys
   *          if the control's value does not match any of the allowed values, or null if it's valid.
   */
  export function enumTypeValidator(allowedValues: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isTruthy(control) && isTruthy(control.value)) {
        const value: string = control.value;

        if (!allowedValues.includes(value)) {
          return {invalidType: value, allowedValues};
        }
      }
      return null;
    };
  }


  /**
   * Validator function to check if two form fields have matching values.
   *
   * This validator function compares the values of two form fields and checks if they match. It's typically used
   * to confirm that two password fields or similar fields have the same value.
   *
   * @param fieldName1 The name of the first form field to compare.
   * @param fieldName2 The name of the second form field to compare.
   * @param label1 The label or description of the first form field (used in error message).
   * @param label2 The label or description of the second form field (used in error message).
   *
   * @returns A validator function that sets an error on the second form field if the values do not match and
   *          returns a validation error object with 'mismatch', 'label1', and 'label2' keys, or null if they match.
   */
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


  /**
   * Validator function to check the validity of a date based on a provided regular expression pattern.
   *
   * This validator function checks if the provided date matches a specified regular expression pattern.
   * It's used to validate dates according to a custom format defined by the regular expression.
   *
   * @param pattern The regular expression pattern used to validate the date format.
   *
   * @returns A validator function that returns a validation error object with the 'invalidDateFormat' key
   *          if the date does not match the pattern, or null if it's valid.
   */
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


  /**
   * Validator function to check if a date is in the past.
   *
   * This validator function compares the provided date with the current date and checks if the provided date
   * is in the past. It's used to validate that a date entered by the user is not in the future.
   *
   * @param control The form control representing the date input field.
   *
   * @returns A validation error object with the 'pastDate' key if the provided date is in the future, or null if it's valid.
   */
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

  /**
   * Validator function to check if a date input represents a date in the future.
   *
   * This validator function validates that a date input represents a date that is in the future relative to the current date.
   * It's useful for ensuring that a date input corresponds to a date that has not already occurred.
   *
   * @param control The form control representing the date input to be validated.
   *
   * @returns A validation error object with the 'futureDate' key if the date input represents a date in the past,
   *          or null if it represents a future date or if the control is not defined or empty.
   */
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


  /**
   * Validator function to check the validity of a phone number based on a provided regular expression pattern.
   *
   * This validator function checks if the provided phone number matches a specified regular expression pattern.
   * It's used to validate phone numbers according to a custom format defined by the regular expression.
   *
   * @param pattern The regular expression pattern used to validate the phone number format.
   *
   * @returns A validator function that returns a validation error object if the phone number does not match the pattern,
   *          or null if it's valid.
   */
  export function phoneNumberValidator(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isTruthy(pattern) && isTruthy(control) && isTruthy(control.value)) {
        const phoneNumber: string = control.value;

        if (!pattern.test(phoneNumber)) {
          return { invalidPhoneNumber: true };
        }
      }
      return null;
    };
  }


  /**
   * Asynchronous validator function to check if an email address already exists in the system.
   *
   * This validator function communicates with a provided authentication service to verify if the provided email
   * address is already registered in the system. It performs various transformations on the input data, including
   * trimming whitespace and handling empty values.
   *
   * @param service The authentication service used for checking email existence.
   *
   * @returns An asynchronous validator function that returns an observable with validation results. It emits null if the
   *          email is not found in the system or an object with the 'exists' property set to true if the email already exists.
   */
  export function emailExistsValidator(service: AuthenticationService): any {
    let previousEmail: string;
    return (control: FormControl): Observable<any> => {
      if (isTruthy(control) && isTruthy(control.value)) {
        const email: string = control.value;

        if (equalsIgnoreCase(previousEmail, email)) {
          return of(null);
        }
        previousEmail = email;

        return of(email).pipe(
          map((value: string): string => value.trim()),
          map((value: string): string | null | any => isFalsy(value) ? null : value),
          switchMap((value: string): Observable<any> => {
            if (isFalsy(value)) {
              return of(null);
            }
            return service.isEmailExists(value).pipe(
              map((response:EntityExistsResponse): AnyProp | null => (response.exists ? { exists: true } : null)),
              catchError(() => of(null))
            );
          })
        );
      }
      return of(null);
    };
  }


  /**
   * Validator function to check the strength and validity of a password based on specified criteria.
   *
   * This validator function checks if the provided password meets specific criteria, including length, character types,
   * and the presence of special characters.
   *
   * @param patterns Regular expressions for different character types (lowercase, uppercase, digit, special character).
   * @param minLength The minimum allowed length for the password (default is 8 characters).
   * @param maxLength The maximum allowed length for the password (default is 24 characters).
   *
   * @returns A validator function that returns validation error objects if the password does not meet the criteria,
   *          or null if it's valid.
   */
  export function passwordValidator(patterns: AnyRegEx, minLength: number = 8, maxLength: number = 24): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isTruthy(control) && isTruthy(control.value)) {
        const value: string = control.value;
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


  /**
   * Validator function to check if a provided date of birth meets a minimum age requirement.
   *
   * This validator function verifies if the provided date of birth corresponds to an individual's age that is equal to
   * or greater than the specified minimum age.
   *
   * @param minAge The minimum age requirement that the date of birth must meet.
   *
   * @returns A validator function that returns a validation error object if the age requirement is not met, or null if it's valid.
   */
  export function ageLimitValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isTruthy(control) && isTruthy(control.value)) {
        const value: string = control.value;
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


  /**
   * Validator function to validate a code or OTP (One-Time Password) based on specified criteria.
   *
   * This validator function checks if the provided input control value meets specific criteria for a code or OTP.
   * It validates the input against a regular expression pattern and ensures it falls within the specified length range.
   *
   * @param pattern The regular expression pattern used to validate the code or OTP.
   * @param minLength The minimum allowed length for the code or OTP (default is 1).
   * @param maxLength The maximum allowed length for the code or OTP (default is 8).
   *
   * @returns A validator function that returns validation error objects if the input does not meet the criteria,
   *          or null if it's valid.
   */
  export function codeOrOtpValidator(pattern: RegExp, minLength: number = 1, maxLength: number = 8): ValidatorFn {
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


  /**
   * Validator function to validate an input based on its selected type configuration.
   *
   * This validator function is used to validate an input control based on its selected type configuration.
   * It takes the selected key and input value from specified control names and validates the input according
   * to the selected type's requirements.
   *
   * @param controlNames An array containing the names of the controls representing the selected key and input value.
   *                    - controlNames[0]: The name of the control representing the selected key.
   *                    - controlNames[1]: The name of the control representing the input value.
   * @param options An array of configuration options containing the type information.
   * @param propToFilter The property of the configuration options used for filtering (default is 'key').
   *
   * @returns A validator function that returns a validation error object if the input does not meet the requirements
   *          of the selected type configuration, or null if it's valid.
   */
  export function typeValidator(controlNames: [string, string], options: any[], propToFilter: string = 'key'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
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


  /**
   * Validator function to check if the provided input is a valid number.
   *
   * This validator checks if the value of the input control is a valid numeric value.
   * If the input value is not a number (isNaN), it returns a validation error indicating that the value is not a number.
   *
   * @param control The AbstractControl representing the input value to validate.
   *
   * @returns A validation error object with the key 'isNumber' set to true if the input is not a number, or null if it's a valid number.
   */
  export function isNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (isNaN(control.value)) {
      return { isNumber: true };
    }
    return null;
  }


  /**
   * Parses a time string and extracts the hours and minutes components.
   *
   * This function takes a time string in the format "HH:MM" (by default, using ":" as the separator) and
   * extracts the hours and minutes as integers. It returns the extracted values as a two-element array [hours, minutes].
   *
   * @param time The time string to parse.
   * @param separator The character used to separate hours and minutes in the time string (default is ":").
   *
   * @returns A two-element array containing the extracted hours and minutes as integers [hours, minutes], or null if the input is invalid.
   */
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


  /**
   * Validator function to check if the provided time is not earlier than a minimum allowed time.
   *
   * This validator compares the provided time with a minimum allowed time and ensures that it is not earlier.
   * It considers both hours and minutes in the comparison.
   *
   * @param minTime The minimum allowed time in HH:MM format.
   * @param pattern The expected time format (default is "HH:MM").
   *
   * @returns A validator function that returns a validation error object if the provided time is earlier than the minimum allowed time, or null if it's valid.
   */
  export function minTimeValidator(minTime: string, pattern: string = TIME_FORMAT): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (nonNull(control) && nonNull(minTime)) {
        const inputTime: string = control.value;
        const inputTimeParsed: TwoArray | any = parseTime(inputTime);
        const minTimeParsed: TwoArray | any = parseTime(minTime);

        if (isFalsy(inputTimeParsed)) {
          return { timeFormatError: true, pattern };
        }

        const chosenHour: number = inputTimeParsed[0];
        const chosenMinute: number = inputTimeParsed[1];

        const requiredHour: number = minTimeParsed[0];
        const requiredMinute: number = minTimeParsed[1];


        /**
         * This code block compares the input time with a minimum allowed time to ensure it's not earlier.
         * The comparison considers both hours and minutes.
         *
         * Compare the hours and minutes to check if the input time is earlier than the minimum allowed time.
         *   - Hour and Minute Comparison:
         *     - In this step, we are comparing the hours and minutes of the input time (chosenHour and chosenMinute)
         *       with the minimum allowed time (requiredHour and requiredMinute) to determine if the input time is
         *       earlier than the minimum allowed time.
         *
         *   - minTimeParsed Check:
         *     - Before performing the comparison, we check if minTimeParsed is not null or falsy. This is important
         *       to ensure that a valid minimum time has been provided for comparison.
         *
         *   - Comparison Logic:
         *     - The comparison logic is split into two parts connected by the logical OR (||) operator.
         *       - chosenHour < requiredHour: This part checks if the hour component of the input time (chosenHour)
         *         is less than the hour component of the minimum allowed time (requiredHour). If this condition is true,
         *         it means that the input time is in an earlier hour of the day than the minimum allowed time.
         *
         *       - (chosenHour === requiredHour && chosenMinute < requiredMinute): This part checks if the hour component
         *         of the input time (chosenHour) is equal to the hour component of the minimum allowed time (requiredHour),
         *         and the minute component of the input time (chosenMinute) is less than the minute component of the
         *         minimum allowed time (requiredMinute). If this condition is true, it means that the input time falls
         *         within the same hour as the minimum allowed time but has an earlier minute.
         *
         * - If either of the comparison conditions is true, it indicates that the input time is indeed earlier than the
         *   minimum allowed time. In such cases, we return a validation error object with the key minTime set to true.
         *   This error indicates that the input time is not valid because it is earlier than the specified minimum time.
         */
        if (minTimeParsed &&
            (inputTimeParsed[0] < requiredHour || (chosenHour === requiredHour && chosenMinute < requiredMinute))) {
          return { minTime: true, minTimeValue: minTime };
        }
      }

      return null;
    };
  }


  /**
   * Validator function to check if the provided time is not greater than a maximum allowed time.
   *
   * This validator compares the provided time with a maximum allowed time and ensures that it does not exceed it.
   * It considers both hours and minutes in the comparison.
   *
   * @param maxTime The maximum allowed time in HH:MM format.
   * @param pattern The expected time format (default is "HH:MM").
   *
   * @returns A validator function that returns a validation error object if the provided time is greater than the maximum allowed time, or null if it's valid.
   */
  export function maxTimeValidator(maxTime: string, pattern: string = TIME_FORMAT): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (nonNull(control) && (nonNull(maxTime))) {
        const inputTime: string = control.value;
        const inputTimeParsed: TwoArray | any = parseTime(inputTime);
        const maxTimeParsed: TwoArray | any = parseTime(maxTime);

        if (isFalsy(inputTimeParsed)) {
          return { timeFormatError: true, pattern };
        }

        const chosenHour: number = inputTimeParsed[0];
        const chosenMinute: number = inputTimeParsed[1];
        const requiredHour: number = maxTimeParsed[0];
        const requiredMinute: number = maxTimeParsed[1];

        /**
         * The condition maxTimeParsed checks if maxTimeParsed is not null. It ensures that the maxTimeParsed array exists and contains valid values.
         *
         * Inside the condition, there are two parts connected by the logical OR (||) operator:
         *
         * a. chosenHour > requiredHour: This part checks if the user's chosen hour (chosenHour) is greater than the required hour (requiredHour).
         *    If this condition is true, it means that the user's chosen time is later in the day than the maximum allowed time.
         *
         * b. (chosenHour === requiredHour && chosenMinute > requiredMinute):
         *    This part checks if the user's chosen hour is equal to the required hour, and the user's chosen minute (chosenMinute) is greater than the required minute (requiredMinute).
         *    If this condition is true, it means that the user's chosen time falls within the same hour as the maximum allowed time but has a later minute.
         */
        if (maxTimeParsed &&
            (chosenHour > requiredHour || (chosenHour === requiredHour && chosenMinute > requiredMinute))) {
          return { maxTime: true };
        }
      }

      return null;
    };
  }


  /**
   * Validator function to check if the end time is greater than the start time in a form group.
   *
   * This validator compares the values of two time fields, typically representing start and end times,
   * and ensures that the end time is greater than the start time. It considers both hours and minutes.
   *
   * @param startTimeFieldName The name of the form control representing the start time.
   * @param endTimeFieldName The name of the form control representing the end time.
   *
   * @returns A validator function that returns a validation error object if the end time is not greater than the start time, or null if it's valid.
   */
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


  /**
   * Validator function to check if the time difference between two time fields is in complete hours.
   *
   * This validator calculates the time difference between the provided "startTime" and "endTime" fields
   * and ensures that the difference is in complete hours, i.e., there are no remaining minutes.
   * For example, a difference of 2 hours and 30 minutes is not considered valid.
   *
   * @param startTimeFieldName The name of the form control representing the start time.
   *
   * @returns A validator function that returns a validation error object if the time difference is not in complete hours, or null if it's valid.
   */
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

      /**
       * i. Minute Difference Calculation:
       *
       * The purpose of this code block is to calculate the total minute difference between the end time and start time. It aims to measure the duration in minutes between two time points.
       * - `endHours * 60 + endMinutes` calculates the total minutes in the `endHours` and `endMinutes`.
       * - `startHours * 60 + startMinutes` calculates the total minutes in the `startHours` and `startMinutes`.
       * Subtracting the total minutes of the start time from the total minutes of the end time gives us the minute difference between the two times.
       *
       * ii. Checking for a Complete Hour:
       *
       * After calculating the minute difference, the code checks if this difference represents a complete hour or not.
       * It does this by checking if `minuteDifference` is not divisible by 60 (i.e., if `minuteDifference % 60 !== 0`).
       *
       * If the difference is not evenly divisible by 60, it means that there are remaining minutes that are not part of a complete hour.
       */
      const minuteDifference: number = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
      if (minuteDifference % 60 !== 0) {
        return { completeHourDifference: true };
      }

      return null;
    }
  }
