import {AbstractControl, FormGroup} from "@angular/forms";
import {convertToDesiredFormat, equalsIgnoreCase, isObject, isTruthy, toCamelCase} from "../../../shared/util/helpers";
import {AnyProp} from "../../../shared/type/base";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";
import {ErrorResponse} from "../../response/error-response";

export abstract class BaseFormComponent {

  protected errorMessage: string | undefined;
  protected fleenHealthForm: FormGroup = new FormGroup<any>({});
  private readonly ERROR_FIELD_NAME: string = "field_name";
  private readonly ERROR_MESSAGES_NAME: string = "errors";
  protected isSubmitting: boolean = false;

  private getAllPropertyKeys(obj: any): string[] {
    const keys: string[] = [];
    if (isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);

          if (isObject(obj) && obj[key] !== null) {
            keys.push(...(this.getAllPropertyKeys(obj[key])));
          }
        }
      }
    }
    return keys;
  }

  protected setErrorsFromApiResponse(errors: AnyProp[] | any): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(this.fleenHealthForm, error[this.ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.ERROR_MESSAGES_NAME]));
      });
      this.fleenHealthForm.markAsTouched();
    }
  }

  protected setExternalFormErrorsFromApiResponse(errors: AnyProp[], form: FormGroup): void {
    if (isTruthy(errors) && Array.isArray(errors)) {
      errors.forEach((error): void => {
        this.setControlError(form, error[this.ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.ERROR_MESSAGES_NAME]));
      });
      form.markAsTouched();
    }
  }

  protected setControlError(value: FormGroup | AbstractControl | any[] | any, fieldName: string, errorMessage: string): void {
    const control: AbstractControl | any = value.get(fieldName) || value.get(toCamelCase(fieldName));
    if (value instanceof FormGroup) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));
    } else if (Array.isArray(value)) {
      value.forEach((subGroup): void => {
        this.setControlError(subGroup, fieldName, errorMessage);
      });
    } else if (value instanceof AbstractControl) {
      this.setFieldError(control, errorMessage, convertToDesiredFormat(fieldName));
      if (value instanceof FormGroup) {
        Object.keys(value.controls).forEach((key): void => {
          this.setControlError(value.get(key), fieldName, errorMessage);
        });
      }
    } else if (isObject(value) && Array.isArray(value)) {
      for (const key in (<any>value)) {
        if (value.hasOwnProperty(key) && isObject(value[key])) {
          this.setControlError(value[key], fieldName, errorMessage);
        }
      }
    }
  }

  protected getMessagesInSentence(messages: string[]): string {
    if (isTruthy(messages) && Array.isArray(messages)) {
      return messages.join('. ') + '.';
    }
    return '';
  }

  protected setFieldError(control: any, errorMessage, fieldName): void {
    if (isTruthy(control)) {
      control.setErrors({ fieldError: errorMessage, labelName: convertToDesiredFormat(fieldName) });
      control.markAsTouched();
    }
  }

  protected disableSubmitting(): void {
    this.isSubmitting = true;
  }

  protected enableSubmitting(): void {
    this.isSubmitting = false;
  }

  protected handleError(error: ErrorResponse): void {
    const { type } = error;
    if (isTruthy(type) && equalsIgnoreCase(type, FORM_VALIDATION_ERROR_TYPE)) {
      this.setErrorsFromApiResponse(error.fields);
      return;
    }
    this.errorMessage = error.message || '';
    this.disableSubmitting();
  }

  protected stopEvent(evt: Event): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  public resetErrorMessage(): void {
    this.errorMessage = '';
  }

}
