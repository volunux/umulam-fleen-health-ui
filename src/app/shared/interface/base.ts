export interface Newable<T extends Object> {

  new(...data: any[]): T;
}

export interface SearchDto {
  [key: string]: any
}
