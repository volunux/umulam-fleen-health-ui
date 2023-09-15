export const DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;
export const PHONE_NUMBER: RegExp = /^\+\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/;
export const TWO_DATES: RegExp = /^\d{4}-\d{2}-\d{2}:\d{4}-\d{2}-\d{2}$/;
export const PASSWORD_PATTERNS: { [key: string]: RegExp } = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  digit: /\d/,
  specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/
}
export const VERIFICATION_CODE: RegExp = /^\d+$/;



export const TIME_FORMAT: string = "HH:MM";
export const DATE_FORMAT: string = "yyyy-MM-dd";
