import {Injectable} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {AnyProp} from "../../shared/type/base";
import {LoggerService} from "./logger.service";
import {LocalStorageService} from "./local-storage.service";
import {isTruthy} from "../../shared/util/helpers";
import {ANY_EMPTY} from "../../shared/constant/other-constant";

@Injectable()
export class JwtService {

  constructor(private logger: LoggerService,
              private localStorageService: LocalStorageService) { }

  public getAuthClaims(): AnyProp {
    const authToken: string = this.localStorageService.getAuthorizationToken();
    if (isTruthy(authToken)) {
      return this.getClaims(authToken);
    }
    return ANY_EMPTY;
  }

  public getClaims(token: string): AnyProp {
    let claims: AnyProp = ANY_EMPTY;
    try {
      claims = jwtDecode.default(token);
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
