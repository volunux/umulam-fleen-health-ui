import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {AUTHENTICATION_ENTRY_POINT} from "../../shared/constant/base-config";
import {SessionStorageService} from "../service/session-storage.service";
import {USER_DESTINATION_PAGE_KEY} from "../../shared/constant/other-constant";

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private authenticationService: AuthenticationService,
                     private sessionStorageService: SessionStorageService,
                     private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.saveUserDestinationPage(state);
      return this.router.createUrlTree([AUTHENTICATION_ENTRY_POINT]);
    }
  }

  public isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticationStatusCompleted();
  }

  public saveUserDestinationPage(state: RouterStateSnapshot): void {
    this.sessionStorageService.setObject(USER_DESTINATION_PAGE_KEY, state.url);
  }

}
