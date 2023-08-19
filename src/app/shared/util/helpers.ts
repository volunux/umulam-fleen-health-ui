
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

export function equalsIgnoreCase(value1: string, value2: string): boolean {
  if (isTruthy(value1) && isTruthy(value2)) {
    return value1.toLowerCase() === value2.toLowerCase();
  }
  return false;
}

export function isObject(value: any): boolean {
  return isTruthy(value) && typeof value === 'object';
}
