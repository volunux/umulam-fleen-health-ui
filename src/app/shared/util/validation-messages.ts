import {AbstractControl} from "@angular/forms";
import {DATE_FORMAT} from "./format-pattern";
import {capitalize, joining} from "./helpers";

export const validationErrorMessages: { [key: string]: Function } = {
  required: (control: AbstractControl | any, label: string) => `${label} is required and cannot be empty.`,
  minlength: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be at least ${control?.errors["minlength"].requiredLength} characters.`,
  maxlength: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be at most ${control?.errors["maxlength"].requiredLength} characters.`,
  min: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be greater than or equal to ${control?.errors["min"].min}`,
  max: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be less than or equal to ${control?.errors["max"].max}`,
  email: (control: AbstractControl | any, label: string) => `${label} '${control.value}' is not a valid email`,
  invalidType: (control: AbstractControl | any, label: string) => `${label} '${control.value}' is not valid. Use ${joining(capitalize(control?.errors["allowedValues"]))}`,
  invalidDateFormat: (control: AbstractControl | any, label: string) => `${label} is not a valid date. Use ${DATE_FORMAT}`,
  pastDate: (control: AbstractControl | any, label: string) => `${label} ${control.value} should be in the past`,
  futureDate: (control: AbstractControl | any, label: string) => `${label} ${control.value} should be in the future`,
};
