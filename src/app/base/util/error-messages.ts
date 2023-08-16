export type ErrorTypes =
  | 'required'
  | 'email'
  | 'minlength'
  | 'invalidDate'
  | 'invalidYear';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {

  required: (formControlName: string): string => {
    return `${formControlName} is required.`;
  },
  email: (): string => {
    return `This is not a valid email address.`;
  },
  minlength: (formControlName, requirement): string => {
    return `${formControlName} should be at least ${requirement} characters.`;
  },
  invalidDate: (): string => {
    return `This is not a valid date.`
  },
  invalidYear: (): string => {
    return `Date of Birth should be after year 1900.`;
  }
};
