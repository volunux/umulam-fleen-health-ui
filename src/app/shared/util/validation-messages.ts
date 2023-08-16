import {AbstractControl} from "@angular/forms";
import {DATE_FORMAT} from "./format-pattern";
import {capitalize, joining} from "./helpers";

export const validationErrorMessages = {
  required: (control: AbstractControl | any, label: string) => `${label} is required and cannot be empty.`,
  minlength: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be at least ${control?.errors["minlength"].requiredLength} characters.`,
  maxlength: (control: AbstractControl | any, label: string) => `${label} '${control.value}' should be at most ${control?.errors["maxlength"].requiredLength} characters.`,
  email: (control: AbstractControl | any, label: string) => `${label} '${control.value}' is not a valid email`,
  invalidType: (control: AbstractControl | any, label: string) => `${label} '${control.value}' is not valid. Use ${joining(capitalize(control?.errors["allowedValues"]))}`,
  invalidDateFormat: (control: AbstractControl | any, label: string) => `${label} is not a valid date. Use ${DATE_FORMAT}`,
  pastDate: (control: AbstractControl | any, label: string) => `${label} ${control.value} should be in the past`,
  futureDate: (control: AbstractControl | any, label: string) => `${label} ${control.value} should be in the future`,
};
