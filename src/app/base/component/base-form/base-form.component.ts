import {AbstractControl, FormGroup} from "@angular/forms";
import {capitalize, isObject, isTruthy} from "../../../shared/util/helpers";
import {AnyProp} from "../../../shared/type/base";

export class BaseFormComponent {

  protected errorMessage: string | undefined;
  protected fleenHealthForm: FormGroup = new FormGroup<any>({});
  private readonly ERROR_FIELD_NAME: string = "field_name";
  private readonly ERROR_MESSAGES_NAME: string = "errors";

  public getFormKeys(): string[] {
    if (isTruthy(this.fleenHealthForm)) {
      return Object.keys(this.fleenHealthForm.value);
    }
    return [];
  }

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

  protected setErrorsFromApiResponse(errors: AnyProp[]) {
    errors.forEach((error) => {
      this.setControlError(this.fleenHealthForm, error[this.ERROR_FIELD_NAME], this.getMessagesInSentence(error[this.ERROR_MESSAGES_NAME]));
    });
  }

  protected setControlError(group: FormGroup | any[] | any, fieldName: string, errorMessage: string) {
    if (group instanceof FormGroup) {
      const control: AbstractControl | any = group.get(fieldName) || group.get(capitalize(fieldName));
      if (isTruthy(control)) {
        control.setErrors({ fieldError: errorMessage, fieldName: capitalize(fieldName) });
      }
    } else if (Array.isArray(group)) {
      group.forEach((subGroup): void => {
        this.setControlError(subGroup, fieldName, errorMessage);
      });
    } else if (isObject(group)) {
      for (const key in (<any>group)) {
        if (group.hasOwnProperty(key) && isObject(group[key])) {
          this.setControlError(group[key], fieldName, errorMessage);
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

}
