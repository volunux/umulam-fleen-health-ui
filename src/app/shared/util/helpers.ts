import {SearchResultView} from "../view/search-result.view";
import {AnyProp} from "../type/base";
import {Newable} from "../interface/base";
import {DEFAULT_FORM_CONTROL_VALUE} from "../constant/enum-constant";


/**
   * Capitalize the first letter of each string in an array of strings.
   *
   * This function takes an array of strings and capitalizes the first letter of each string.
   *
   * @param inputArray An array of strings to be capitalized.
   *
   * @returns An array of strings with the first letter of each string capitalized.
   *
   * @example
   * // Example usage:
   * const words = ['apple', 'banana', 'cherry'];
   * const result = capitalizeMany(words); // Result: ['Apple', 'Banana', 'Cherry']
   */
  export function capitalizeMany(inputArray: string[]): string[] {
    if (isTruthy(inputArray) && Array.isArray(inputArray) && inputArray.length > 0) {
      return inputArray.map((item: string) => capitalize(item));
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


  /**
   * Join an array of strings into a single string with a specified separator.
   *
   * This function takes an array of strings and combines them into a single string using a specified separator.
   *
   * @param inputArray An array of strings to be joined.
   * @param separator (Optional) The separator to be used between each element. Defaults to a comma and space (', ').
   *
   * @returns A single string created by joining the elements of the input array with the specified separator.
   *
   * @example
   * // Example usage:
   * const words = ['apple', 'banana', 'cherry'];
   * const result = joining(words, '-'); // Result: 'apple-banana-cherry'
   */
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

export function nonNull(value: any): boolean {
  return value !== null;
}


  /**
   * Compare two strings for equality, ignoring case.
   *
   * This function performs a case-insensitive comparison between two strings to check if they are equal.
   *
   * @param value1 The first string to compare.
   * @param value2 The second string to compare.
   *
   * @returns `true` if the strings are equal (case-insensitive), `false` otherwise.
   *
   * @example
   * // Example usage:
   * const str1 = 'Hello';
   * const str2 = 'hello';
   * const isEqual = equalsIgnoreCase(str1, str2); // Result: true
   */
  export function equalsIgnoreCase(value1: string | undefined | null, value2: string | undefined): boolean {
    if (isTruthy(value1) && isTruthy(value2)) {
      return value1?.toLowerCase() === value2?.toLowerCase();
    }
    return false;
  }


  /**
   * Check if a value is an object.
   *
   * This function determines whether the provided value is an object by checking if it's truthy and has a type of 'object'.
   *
   * @param value The value to be checked.
   *
   * @returns `true` if the value is an object, `false` otherwise.
   *
   * @example
   * // Example usage:
   * const obj = { key: 'value' };
   * const isArray = Array.isArray(obj); // Result: false
   * const isObj = isObject(obj); // Result: true
   */
  export function isObject(value: any): boolean {
    return isTruthy(value) && typeof value === 'object';
  }


  /**
   * Convert a space-separated or hyphen-separated string into camelCase.
   *
   * This function takes a string as input, which may be space-separated or hyphen-separated, and converts it into camelCase.
   * In camelCase, each word except the first is capitalized, and spaces or hyphens are removed.
   *
   * @param input The input string to convert to camelCase.
   *
   * @returns The input string converted to camelCase.
   *
   * @example
   * // Example usage:
   * const inputString = 'hello world';
   * const camelCasedString = toCamelCase(inputString);
   * // Result: 'helloWorld'
   */
  export function toCamelCase(input: string): string {
    const words: string[] = input.split(/[\s_-]+/);
    const camelCaseWords: string[] = words.map((word:string, index: number): string =>
      index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word)
    );

    return camelCaseWords.join('');
  }


  /**
   * Capitalize the first letter of a word and convert the rest of the letters to lowercase.
   *
   * This function takes a word as input and returns the word with its first letter capitalized and the rest of the letters in lowercase.
   *
   * @param word The word to be capitalized.
   *
   * @returns The capitalized word.
   *
   * @example
   * // Example usage:
   * const inputWord = 'hello';
   * const capitalizedWord = capitalizeFirstLetter(inputWord);
   * // Result: 'Hello'
   */
  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }


  /**
   * Normalize a name string by removing special characters, capitalizing words, and converting spaces to a single space.
   *
   * This function takes an input string, cleans it by removing non-alphanumeric characters and converting consecutive spaces to a single space.
   * It then splits the cleaned string into words, capitalizes the first letter of each word, and finally, joins the normalized words with a single space.
   *
   * @param input The input name string to be normalized.
   *
   * @returns The normalized name string.
   *
   * @example
   * // Example usage:
   * const inputName = 'john_doe   smith';
   * const normalizedName = normalizeName(inputName);
   * // Result: 'John Doe Smith'
   */
  export function normalizeName(input: string): string {
    const cleanedInput: string = input.replace(/[^a-zA-Z0-9\s]/g, ' ');
    const words: string[] = cleanedInput.split(/\s+/);
    const normalizedWords: string[] = words.map((word: string) => capitalizeFirstLetter(word));
    return normalizedWords.join(' ');
  }


  /**
   * Converts a string into a desired format.
   *
   * This function takes an input string and an optional separator regex pattern to split the input into segments.
   * It then processes each segment by splitting camelCase words and capitalizing the first letter of each word.
   * Finally, it joins the formatted segments into a string using a space as the default separator.
   *
   * @param input The input string to be converted.
   * @param separator (Optional) A regular expression pattern used to split the input string into segments.
   *
   * @returns The input string converted into the desired format.
   *
   * @example
   * // Example usage:
   * const inputString = 'camelCaseExample';
   * const formattedString = convertToDesiredFormat(inputString);
   * // Result: 'Camel Case Example'
   */
  export function convertToDesiredFormat(input: string, separator: RegExp = /_/): string {
    const segments: string[] = input.split(separator);
    const formattedSegments: string[] = segments.map((segment) => {
      const words: string[] = segment.split(/(?=[A-Z])/); // Split camelCase segments
      const formattedWords: string[] = words.map((word) => capitalizeFirstLetter(word));
      return formattedWords.join(' ');
    });

    return formattedSegments.join(' ');
  }


  /**
   * Maps a response to a search result view.
   *
   * This function takes a constructor function, `Constructor`, and a response object and maps the response
   * to a search result view with values created by instantiating `Constructor` for each item in the response.
   *
   * @param Constructor A constructor function used to create objects for the search result view.
   * @param response The response object containing data to map to the search result view.
   *
   * @returns A search result view containing values created from the response using the specified constructor.
   *
   * @example
   * // Example usage:
   * const response = {
   *   totalResults: 3,
   *   values: [
   *     { id: 1, name: 'Alice' },
   *     { id: 2, name: 'Bob' },
   *     { id: 3, name: 'Charlie' },
   *   ],
   * };
   *
   * class User {
   *   constructor(public id: number, public name: string) {}
   * }
   *
   * const searchResult = mapToSearchResult(User, response);
   * // Result: SearchResultView<User> object with 'totalResults' and 'values' properties.
   * // 'values' property contains an array of User instances.
   */
  export function mapToSearchResult<T extends Object>(Constructor: Newable<T>, response: any): SearchResultView<T> {
    const values = response.values.map((value: any) => new Constructor(value));
    const searchResultView : SearchResultView<T> = new SearchResultView(response);
    searchResultView.values = values;
    return searchResultView;
  }


  /**
   * Extracts values from an array of objects by a specified key.
   *
   * This function extracts values from an array of objects based on a specified key and returns them as an array.
   *
   * @param obj An array of objects containing the values to extract.
   * @param key The key to specify which property's value to extract from each object.
   *
   * @returns An array of extracted values.
   *
   * @example
   * // Example usage:
   * const users = [
   *   { id: 1, name: 'Alice' },
   *   { id: 2, name: 'Bob' },
   *   { id: 3, name: 'Charlie' },
   * ];
   *
   * const names = getPropsValueAsArray(users, 'name');
   * // Result: ['Alice', 'Bob', 'Charlie']
   *
   * const ages = getPropsValueAsArray(users, 'age');
   * // Result: [] (age property does not exist in the objects)
   */
  export function getPropsValueAsArray(obj: AnyProp[], key: string): string[] {
    if (isObject(obj) && Array.isArray(obj) && obj.length > 0) {
      return obj.map((entry: AnyProp) => entry[key]);
    }
    return [];
  }



  /**
   * Validates whether a given value matches a specified regular expression pattern.
   *
   * This function checks if a given string value matches a specified regular expression pattern.
   *
   * @param pattern The regular expression pattern to match against.
   * @param value The string value to be validated.
   *
   * @returns A boolean value indicating whether the value matches the pattern (true) or not (false).
   *
   * @example
   * // Example usage:
   * const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   * const isValidEmail = validatePattern(emailPattern, 'example@email.com');
   * // Result: true (valid email format)
   *
   * const datePattern = /^\d{4}-\d{2}-\d{2}$/;
   * const isValidDate = validatePattern(datePattern, '2023-09-15');
   * // Result: true (valid date format)
   *
   * const invalidPattern = /[A-Z]/;
   * const isInvalid = validatePattern(invalidPattern, 'abc123');
   * // Result: false (no uppercase letters in 'abc123')
   */
  export function validatePattern(pattern: RegExp, value: string): boolean {
    return pattern.test(value);
  }


  /**
   * Creates an object with specified property keys to represent a range of dates.
   *
   * This function takes a string input representing a range of dates separated by a specified separator and
   * creates an object with two properties using the specified keys to represent the start and end dates of the range.
   *
   * @param value The input string representing the range of dates (e.g., '2023-01-01:2023-01-15').
   * @param keys An optional array of two strings specifying the property keys for the start and end dates in the resulting object.
   * @param separator An optional separator string used to split the input value into start and end date strings.
   *
   * @returns An object with properties representing the start and end dates of the range, using the specified keys.
   *
   * @example
   * // Example usage:
   * const dateRangeString = '2023-01-01:2023-01-15';
   * const dateRangeObj = createBetweenDateObj(dateRangeString, ['startDate', 'endDate']);
   * // Result: { startDate: '2023-01-01', endDate: '2023-01-15' }
   *
   * const customSeparator = '--';
   * const customDateRangeString = '2023-02-01--2023-02-28';
   * const customDateRangeObj = createBetweenDateObj(customDateRangeString, ['start', 'end'], customSeparator);
   * // Result: { start: '2023-02-01', end: '2023-02-28' }
   *
   * const emptyString = '';
   * const emptyDateRangeObj = createBetweenDateObj(emptyString);
   * // Result: {}
   */
  export function createBetweenDateObj(value: string, keys: [string, string] = ['startDate', 'endDate'], separator: string = ':'): AnyProp {
    if (isTruthy(value)) {
      const twoDateString: string[] = value.split(separator);
      return { [keys[0]]: twoDateString[0], [keys[1]]: twoDateString[1] }
    }
    return {};
  }


  /**
   * Checks if a property exists in an object.
   *
   * This function takes an object and a property key as input and determines whether the property exists within the object.
   *
   * @param obj The object to be checked for the existence of the property.
   * @param key The property key to check for in the object.
   *
   * @returns `true` if the property exists in the object, `false` otherwise.
   *
   * @example
   * // Example usage:
   * const person = { name: 'Alice', age: 25 };
   * const hasName = propExists(person, 'name');
   * // Result: true (the 'name' property exists in the 'person' object)
   *
   * const car = { make: 'Toyota', model: 'Camry' };
   * const hasColor = propExists(car, 'color');
   * // Result: false (the 'color' property does not exist in the 'car' object)
   *
   * const emptyObject = {};
   * const hasProperty = propExists(emptyObject, 'property');
   * // Result: false (the 'property' key does not exist in the 'emptyObject')
   */
  export function propExists(obj: AnyProp, key: string): boolean {
    return isObject(obj) && obj.hasOwnProperty(key);
  }

  /**
   * Checks if an object has at least one property.
   *
   * This function takes an object as input and determines whether it contains at least one property.
   *
   * @param obj The object to be checked for properties.
   *
   * @returns `true` if the object has at least one property, `false` otherwise.
   *
   * @example
   * // Example usage:
   * const emptyObject = {};
   * const hasProperty = hasAtLeastAProperty(emptyObject);
   * // Result: false (the emptyObject has no properties)
   *
   * const nonEmptyObject = { name: 'John', age: 30 };
   * const hasProperty = hasAtLeastAProperty(nonEmptyObject);
   * // Result: true (the nonEmptyObject has properties)
   *
   * const nullObject = null;
   * const hasProperty = hasAtLeastAProperty(nullObject);
   * // Result: false (null input is treated as having no properties)
   */
  export function hasAtLeastAProperty(obj: any): boolean {
    return isObject(obj) && Object.keys(obj).length > 0;
  }

  /**
   * Converts a JavaScript Date object to an ISO 8601 formatted date string (YYYY-MM-DD).
   *
   * This function takes a Date object as input and returns a string representing the date in ISO 8601 format (YYYY-MM-DD).
   *
   * @param date The Date object to be converted to an ISO 8601 formatted date string.
   *
   * @returns An ISO 8601 formatted date string (YYYY-MM-DD) representing the provided Date object.
   *
   * @example
   * // Example usage:
   * const currentDate = new Date();
   * const isoDate = toISODate(currentDate);
   * // Result: "2023-09-12" (assuming the current date is September 12, 2023)
   *
   * const nullDate = null;
   * const defaultISODate = toISODate(nullDate);
   * // Result: "" (an empty string is returned for null input)
   */
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

  /**
   * Returns the provided value as a string or a default value if the provided value is falsy.
   *
   * This function is used to ensure that a value is returned as a string, even if the provided value is falsy (e.g., undefined or null).
   * If the provided value is truthy, it will be converted to a string. If the provided value is falsy, the default value (if provided) will be returned as a string.
   *
   * @param value The value to be converted to a string or returned as is.
   * @param defaultValue The default value to be returned as a string if the provided value is falsy (optional).
   *
   * @returns A string representation of the provided value or the default value if the provided value is falsy.
   *
   * @example
   * // Example usage:
   * const inputNumber = 42;
   * const stringValue = withDefault(inputNumber, "0");
   * // Result: "42"
   *
   * const emptyValue = null;
   * const defaultValue = withDefault(emptyValue, "N/A");
   * // Result: "N/A"
   */
  export function withDefault(value: string | number, defaultValue: string = DEFAULT_FORM_CONTROL_VALUE): string {
    if (isTruthy(value)) {
      return value.toString();
    }
    return defaultValue;
  }


  /**
   * Extracts file extensions from an array of file type strings.
   *
   * This function takes an array of file type strings (e.g., "image/jpeg", "application/pdf") and extracts the file extensions (e.g., "jpeg", "pdf").
   *
   * @param fileTypes An array of file type strings to extract extensions from.
   *
   * @returns An array of file extensions extracted from the input file types.
   *
   * @example
   * // Example usage:
   * const fileTypes = ["image/jpeg", "application/pdf", "text/plain"];
   *
   * const fileExtensions = getAllowableExtensions(fileTypes);
   * // Result: ["jpeg", "pdf", "plain"]
   */
  export function getAllowableExtensions(fileTypes: string[]): string[] {
    let fileExtensions: string[] = [];
    for (const filetype of fileTypes) {
      fileExtensions.push(filetype.split('/')[1]);
    }
    return fileExtensions;
  }


  /**
   * Converts an array of raw data entries into an array of typed objects.
   *
   * This function takes an array of raw data entries and a constructor function (class) that creates instances of a specific type.
   * It maps over the raw data entries and uses the provided constructor function to create typed objects.
   *
   * @param Constructor The constructor function (class) for creating instances of the desired type.
   * @param entries An array of raw data entries to be converted into typed objects.
   *
   * @returns An array of typed objects created from the raw data entries.
   *
   * @example
   * // Example usage:
   * class Person {
   *   constructor(data: any) {
   *     this.name = data.name;
   *     this.age = data.age;
   *   }
   * }
   *
   * const rawData = [
   *   { name: 'Alice', age: 30 },
   *   { name: 'Bob', age: 25 },
   *   { name: 'Charlie', age: 40 }
   * ];
   *
   * const people = manyToType(Person, rawData);
   * // Result: An array of Person instances with typed data.
   */
  export function manyToType<T extends Object>(Constructor: Newable<T>, entries: any[]): T[] {
    return entries.map((value: any) => new Constructor(value));
  }


  /**
   * Extracts a specific property from an array of objects and returns it as an array of strings.
   *
   * This function takes an array of objects and extracts a specified property (default is 'name') from each object.
   * It returns an array of strings containing the extracted property values.
   *
   * @param arr The array of objects from which to extract the property.
   * @param keyToGet The name of the property to extract (default is 'name').
   *
   * @returns An array of strings containing the extracted property values.
   *
   * @example
   * // Example usage:
   * const items = [
   *   { name: 'Item 1', value: 10 },
   *   { name: 'Item 2', value: 20 },
   *   { name: 'Item 3', value: 30 }
   * ];
   * const names = getPropsAsStringArr(items, 'name');
   * // Result: ['Item 1', 'Item 2', 'Item 3']
   */
  export function getPropsAsStringArr(arr: AnyProp[], keyToGet: string = 'name'): string[] {
    if (isTruthy(arr) && Array.isArray(arr) && arr.length > 0 && isTruthy(keyToGet)) {
      return arr.map((obj: AnyProp) => obj[keyToGet]);
    }
    return [];
  }


  /**
   * Removes empty keys (undefined, null, or empty strings) from an object.
   *
   * This function takes an input object and iterates through its properties.
   * For each property, it checks if the value is undefined, null, or an empty string,
   * and if so, it removes the property (key-value pair) from the object.
   *
   * @param obj The object from which to remove empty keys.
   *
   * @returns The modified object with empty keys removed.
   */
  export function removeEmptyKeys<T>(obj: T): T {
    if (isTruthy(obj) && isObject(obj)) {
      for (const key in obj) {
        if ((<any>obj).hasOwnProperty(key)) {
          const value: any = obj[key];

          if (value === undefined || value === null || value === '') {
            delete obj[key];
          }
        }
      }
    }
    return obj;
  }


  /**
   * Retrieves the first key-value pair from an object.
   *
   * This function iterates through the properties of an object and returns the first key-value pair encountered.
   * The returned value is an array containing two elements: the first element is the key, and the second element is the value.
   *
   * @param obj The object from which to retrieve the first key-value pair.
   *
   * @returns An array containing the first key-value pair as [key, value]. If no key-value pair is found, it returns an empty array.
   */
  export function getFirstKeyAndValue(obj: Record<string, any>): [string, any] {
    if (isTruthy(obj) && isObject(obj)) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          return [key, value];
        }
      }
    }
    return ['', ''];
  }


  /**
   * Checks if all properties of an object are truthy values.
   *
   * This function iterates through all properties of an object and checks if their values are truthy.
   * If any property's value is falsy (e.g., null, undefined, false, 0), the function returns false.
   * Otherwise, it returns true, indicating that all properties have truthy values.
   *
   * @param obj The object whose properties are to be checked for truthiness.
   *
   * @returns A boolean value indicating whether all properties of the object are truthy.
   */
  export function areAllPropertiesTruthy(obj: Record<string, any>): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !obj[key]) {
        return false;
      }
    }
    return true;
  }


  /**
   * Checks for overlapping periods in an array of existing periods when adding a new period.
   *
   * This function is used to determine if there is an overlap between a new period and any of the existing periods in an array.
   * It compares the day of the week, start time, and end time of the new period with each existing period to detect overlaps.
   *
   * @param existingPeriods An array of existing periods to check for overlaps against the new period.
   * @param newPeriod The new period to be added and checked for overlaps.
   *
   * @returns A boolean value indicating whether there is an overlap with any existing period.
   */

  export function checkForOverlappingPeriods(existingPeriods: any[], newPeriod: any): boolean {
    const overlappingPeriod = existingPeriods.find((period) => {
      return period.dayOfWeek === newPeriod.dayOfWeek &&
        ((newPeriod.startTime >= period.startTime && newPeriod.startTime <= period.endTime) ||
          (newPeriod.endTime >= period.startTime && newPeriod.endTime <= period.endTime));
    });

    return !!overlappingPeriod;
  }
