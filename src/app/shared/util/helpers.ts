
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


export function isFalsy(value: any): boolean {
  return !value;
}

export function isTruthy(value: any): boolean {
  return !!value;
}

export function isObject(value: any): boolean {
  return isTruthy(value) && typeof value === 'object';;
}
