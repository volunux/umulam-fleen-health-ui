import {SearchResultView} from "../view/search-result.view";
import {AnyProp, Newable} from "../type/base";

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
  const camelCaseWords: string[] = words.map((word, index) =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word)
  );

  return camelCaseWords.join('');
}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


function normalizeName(input: string): string {
  const cleanedInput = input.replace(/[^a-zA-Z0-9\s]/g, '');
  const words = cleanedInput.split(/\s+/);
  const normalizedWords = words.map((word) => capitalizeFirstLetter(word));
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
