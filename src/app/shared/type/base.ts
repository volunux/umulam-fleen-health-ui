
export type AnyProp = {
  [key: string] : any
}

export type AnyArray = [string, any][] | any;


export type AnyRegEx = {
  [key: string] : any
}

// export type Newable<T> = { new: (data?: T) => T };

export interface Newable<T extends Object> {

  new(...data: any[]): T;
}
