import {AnyProp} from "../type/base";

export const DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;
export const DATE_FORMAT: string = "yyyy-MM-dd";
export const PHONE_NUMBER: RegExp = /^\+\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/;

export const passwordPatterns: { [key: string]: RegExp } = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  digit: /\d/,
  specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/
}
