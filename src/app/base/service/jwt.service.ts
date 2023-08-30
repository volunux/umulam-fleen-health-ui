import {Injectable} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {AnyProp} from "../../shared/type/base";
import {LoggerService} from "./logger.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private logger: LoggerService,
              private localStorageService: LocalStorageService) { }

  public getClaims(): AnyProp | null {
    let claims: AnyProp | null = null;
    try {
      claims = jwtDecode.default(this.localStorageService.getAuthorizationToken());
    } catch (error: any) {
      this.logger.error(error);
    }
    return claims;
  }

  public isTokenValid(token: string): boolean {
    try {
      jwtDecode.default(token);
      return true;
    } catch (error: any) {
      this.logger.error(error);
    }
    return false;
  }

}
