import {Injectable} from '@angular/core';
import {AUTHORIZATION_TOKEN_KEY} from "../../shared/constant/other-constant";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getAuthorizationToken(): string {
    return this.hasObject(AUTHORIZATION_TOKEN_KEY)
      ? localStorage.getItem(AUTHORIZATION_TOKEN_KEY) as string
      : "";
  }

  setObject(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getObject(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  hasObject(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

   clear(): void {
    localStorage.clear();
  }
}
