import {Injectable} from '@angular/core';
import {AUTHORIZATION_TOKEN_KEY, REFRESH_AUTHORIZATION_TOKEN_KEY} from "../../shared/constant/other-constant";
import {isTruthy} from "../../shared/util/helpers";

@Injectable()
export class LocalStorageService {

  constructor() { }

  public getAuthorizationToken(): string {
    return this.hasObject(AUTHORIZATION_TOKEN_KEY) && isTruthy(this.getObject(AUTHORIZATION_TOKEN_KEY))
      ? this.getObject(AUTHORIZATION_TOKEN_KEY) as string
      : "";
  }

  public getAuthorizationRefreshToken(): string {
    return this.hasObject(REFRESH_AUTHORIZATION_TOKEN_KEY) && isTruthy(this.getObject(REFRESH_AUTHORIZATION_TOKEN_KEY))
      ? this.getObject(REFRESH_AUTHORIZATION_TOKEN_KEY) as string
      : "";
  }

  public setObject(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getObject(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  public hasObject(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public clear(): void {
    localStorage.clear();
  }

  public clearAuthorizationTokens(): void {
    this.removeObject(AUTHORIZATION_TOKEN_KEY);
    this.removeObject(REFRESH_AUTHORIZATION_TOKEN_KEY);
  }
}
