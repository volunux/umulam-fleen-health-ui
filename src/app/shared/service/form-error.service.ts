import { Injectable } from '@angular/core';
import {ERROR_MESSAGES, ErrorTypes} from "../../base/util/error-messages";

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() { }

  getErrorValidationMessage(
    formControlName: string,
    errors: [string, any][]
  ): string {
    switch (true) {
      case this.checkErrorType(errors, 'required'):
        return ERROR_MESSAGES['required'](formControlName);
      case this.checkErrorType(errors, 'invalidYear'):
        return ERROR_MESSAGES['invalidYear']();
      case this.checkErrorType(errors, 'invalidDate'):
        return ERROR_MESSAGES['invalidDate']();

      case this.checkErrorType(errors, 'email'):
        return ERROR_MESSAGES['email']();

      case this.checkErrorType(errors, 'minlength'):
        const minRequirement = this.getErrorMessage(
          errors,
          'minlength'
        )?.requiredLength;
        return ERROR_MESSAGES['minlength'](formControlName, minRequirement);

      default:
        return '';
    }
  }

  checkErrorType(errors: [string, any][], key: ErrorTypes) {
    return errors.some(([errorKey, value]) => errorKey === key);
  }

  getErrorMessage(errors: [string, any][], key: ErrorTypes) {
    return errors.find(([k, v]) => k === key)?.[1];
  }


}
