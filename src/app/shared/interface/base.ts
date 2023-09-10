export interface Newable<T extends Object> {

  new(...data: any[]): T;
}

export interface SearchDto {
  [key: string]: any
}

export interface FileDetail {
  [key: string]: string;
}
