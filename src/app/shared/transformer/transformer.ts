
export function toRequestBody(data: any): Record<string, string> {
  const newData: Record<string, string> = {};

  for (const property of Object.keys(data)) {
    const transformedProperty = property.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    newData[transformedProperty] = data[property];
  }

  return newData;
}

export function toBody(data: any): string {
  const newData: Record<string, string> = {};

  for (const property of Object.keys(data)) {
    const transformedProperty: string = property.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    newData[transformedProperty] = data[property];
  }

  return toJson(newData);
}

export function toJson(data: any) {
  return JSON.stringify(data);
}
