import {isObject, toCamelCase} from "../util/helpers";

export function toRequestBody(data: any): Record<string, string> {
  const newData: Record<string, string> = {};

  if (isObject(data)) {
    for (const property of Object.keys(data)) {
      const transformedProperty: string = property.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      newData[transformedProperty] = data[property];
    }
  }
  return newData;
}

export const toSnakeCase = toRequestBody;

export function toBody(data: any): string {
  const newData: Record<string, string> = {};

  if (isObject(data)) {
    for (const property of Object.keys(data)) {
      const transformedProperty: string = property.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      newData[transformedProperty] = data[property];
    }
  }

  return toJson(newData);
}

export function toCamelCaseKeys(data: any): any {
  if (!isObject(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item: string) => toCamelCaseKeys(item));
  }

  const newData: Record<string, any> = {};
  for (const property of Object.keys(data)) {
    const transformedProperty: string = toCamelCase(property);
    newData[transformedProperty] = toCamelCaseKeys(data[property]);
  }

  return newData;
}

export function toJson(data: any) {
  return JSON.stringify(data);
}
