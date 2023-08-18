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
  invalidPhoneNumber: (control: AbstractControl | any, label: string) => `${label} ${control.value} is not a valid phone number. Use e.g. +2347012345678`,
  mismatch: (control: AbstractControl | any, label: string) => `${control?.errors["label1"]} does not match ${control?.errors["label2"]}`,
  atLeastLength: (control: AbstractControl | any, label: string) => `${label} should be between ${control?.errors["minLength"]} and ${control?.errors["maxLength"]} characters`,
  atLeastLowercase: (control: AbstractControl | any, label: string)=> `${label} should contain at least a lowercase`,
  atLeastUppercase: (control: AbstractControl | any, label: string)=> `${label} should contain at least an uppercase`,
  atLeastDigit: (control: AbstractControl | any, label: string)=> `${label} should contain at least a digit`,
  atLeastSpecialChar: (control: AbstractControl | any, label: string)=> `${label} should contain at least a special character`,
  exists: (control: AbstractControl | any, label: string) => `${label} '${control?.value}' already exists.`
};
