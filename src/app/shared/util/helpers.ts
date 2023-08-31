import {SearchResultView} from "../view/search-result.view";
import {AnyProp} from "../type/base";
import {Newable} from "../interface/base";
import {DEFAULT_FORM_CONTROL_VALUE} from "../constant/enum-constant";


export function capitalizeMany(inputArray: string[]): string[] {
  if (isTruthy(inputArray) && Array.isArray(inputArray) && inputArray.length > 0) {
    return inputArray.map(item => capitalize(item));
  }
  return [];
}

export function capitalize(value: string): string {
  if (isTruthy(value)) {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }
  return '';
}

export function joining(inputArray: string[], separator: string = ", "): string {
  if (isTruthy(inputArray) && Array.isArray(inputArray) && inputArray.length > 0) {
    return inputArray.join(separator);
  }
  return '';
}


export function isFalsy(value: any): boolean {
  return !value;
}

export function isTruthy(value: any): boolean {
  return !!value;
}

export function equalsIgnoreCase(value1: string | undefined | null, value2: string | undefined): boolean {
  if (isTruthy(value1) && isTruthy(value2)) {
    return value1?.toLowerCase() === value2?.toLowerCase();
  }
  return false;
}

export function isObject(value: any): boolean {
  return isTruthy(value) && typeof value === 'object';
}

export function toCamelCase(input: string): string {
  const words: string[] = input.split(/[\s_-]+/);
  const camelCaseWords: string[] = words.map((word:string, index: number): string =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word)
  );

  return camelCaseWords.join('');
}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


function normalizeName(input: string): string {
  const cleanedInput: string = input.replace(/[^a-zA-Z0-9\s]/g, '');
  const words: string[] = cleanedInput.split(/\s+/);
  const normalizedWords: string[] = words.map((word) => capitalizeFirstLetter(word));
  return normalizedWords.join(' ');
}

export function convertToDesiredFormat(input: string, separator: RegExp = /[_]/): string {
  const segments: string[] = input.split(separator);
  const formattedSegments: string[] = segments.map((segment) => {
    const words: string[] = segment.split(/(?=[A-Z])/); // Split camelCase segments
    const formattedWords: string[] = words.map((word) => capitalizeFirstLetter(word));
    return formattedWords.join(' ');
  });

  return formattedSegments.join(' ');
}

export function mapToSearchResult<T extends Object>(Constructor: Newable<T>, response: any): SearchResultView<T> {
  const values = response.values.map((value: any) => new Constructor(value));
  const searchResultView : SearchResultView<T> = new SearchResultView(response);
  searchResultView.values = values;
  return searchResultView;
}

export function getPropsValueAsArray(obj: AnyProp[], key: string): string[] {
  if (isObject(obj) && Array.isArray(obj) && obj.length > 0) {
    return obj.map((option: AnyProp) => option[key]);
  }
  return [];
}


export function validatePattern(pattern: RegExp, value: string): boolean {
  return pattern.test(value);
}

export function createBetweenDateObj(value: string, keys: [string, string] = ['startDate', 'endDate'], separator: string = ':'): AnyProp {
  if (isTruthy(value)) {
    const twoDateString: string[] = value.split(separator);
    return { [keys[0]]: twoDateString[0], [keys[1]]: twoDateString[1] }
  }
  return {};
}

export function propExists(obj: AnyProp, key: string): boolean {
  return isObject(obj) && obj.hasOwnProperty(key);
}

export function hasAtLeastAProperty(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length > 0;
}

export function toISODate(date: Date): string {
  if (isTruthy(date) && isObject(date)) {
    let day: string;
    let month: string;
    let year: string;
    day = date.toLocaleDateString('default', { day: '2-digit'});
    month = date.toLocaleDateString('default', { day: '2-digit' });
    year = date.toLocaleDateString('default', { year: 'numeric' });
    return ''.concat(year).concat('-').concat(month).concat('-').concat(day);
  }
  return '';
}

export function withDefault(value: string, defaultValue: string = DEFAULT_FORM_CONTROL_VALUE): string {
  if (isTruthy(value)) {
    return value;
  }
  return defaultValue;
}
