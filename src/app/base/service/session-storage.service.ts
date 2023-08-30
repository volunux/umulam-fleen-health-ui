import {Injectable} from '@angular/core';

@Injectable()
export class SessionStorageService {

  constructor() { }

  public getObject(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public setObject(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

}
