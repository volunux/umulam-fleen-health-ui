import {isTruthy} from "./shared-util";

export function capitalize(inputArray: string[]): string[] {
  if (isTruthy(inputArray) && Array.isArray(inputArray) && inputArray.length > 0) {
    return inputArray.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
  }

  return [];
}

export function joining(inputArray: string[], separator: string = ", "): string {
  if (isTruthy(inputArray) && Array.isArray(inputArray) && inputArray.length > 0) {
    return inputArray.join(separator);
  }

  return '';
}
