import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, of, switchMap, tap} from 'rxjs';
import {AUTHORIZATION_BEARER, AUTHORIZATION_HEADER} from "../../shared/constant/other-constant";
import {LocalStorageService} from "../service/local-storage.service";
import {API_BASE_PATH, API_HOST_URL} from "../../shared/constant/base-config";
import {Router} from "@angular/router";
import {BaseHttpService} from "../../shared/service/base-http.service";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {Location} from "@angular/common";
import {isTruthy} from "../../shared/util/helpers";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private readonly API_REFRESH_TOKEN_ENDPOINT: string = 'verification/refresh-token';
  private readonly WHITELIST: string[] = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/verify-reset-password-code',
    '/email-address'
  ];

  public readonly EXTERNAL_WHITELIST: string[] = [
    's3.amazonaws.com'
  ];

  public constructor(private localStorageService: LocalStorageService,
                     private baseHttpService: BaseHttpService,
                     private authenticationService: AuthenticationService,
                     private router: Router,
                     private location: Location) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isWhitelisted(request.url) || this.isWhitelistedExt(request.url)) {
      return next.handle(request);
    }

    const authToken: string = this.getAccessToken();
    if (isTruthy(authToken)) {
      const authRequest: HttpRequest<any> = request.clone({ setHeaders: { [AUTHORIZATION_HEADER]: this.getAccessToken() } });
      return next.handle(authRequest).pipe(
        catchError((response: HttpErrorResponse): Observable<any> => {
          const { error } = response;
          if (error.status === 401) {
            return this.handleUnauthorized(authRequest, next);
          }
          return this.baseHttpService.handleError(error);
        })
      );
    }
    return this.clearDataAndStartAuthentication();
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshToken: string | undefined = this.getRefreshToken();
    if (isTruthy(refreshToken)) {
      const refreshRequest: HttpRequest<any> = request.clone({
        setHeaders: { [AUTHORIZATION_HEADER]: this.getRefreshToken() },
        url: this.baseHttpService.buildPathUri(this.API_REFRESH_TOKEN_ENDPOINT),
        method: 'GET'
      });

      return next.handle(refreshRequest).pipe(
        tap((value: HttpEvent<any>): void => {
          if (value instanceof HttpResponse) {
            const { body } = value as HttpResponse<any>;
            this.authenticationService.setAuthToken(body);
            this.gotoDestination();
          }
        }),
        catchError(() => {
          return this.clearDataAndStartAuthentication();
        }),
        switchMap(() => of(EMPTY))
      );
    }
    return this.clearDataAndStartAuthentication();
  }

  private clearDataAndStartAuthentication(): Observable<any> {
    this.localStorageService.clearAuthorizationTokens();
    this.startAuthentication();
    return EMPTY;
  }

  private startAuthentication(): void {
    this.authenticationService.startAuthentication(this.router);
  }

  private gotoDestination(): void {
    this.router.navigate([this.location.path()])
      .then((r: boolean) => r);
  }

  private getAccessToken(): string {
    const authToken: string = this.localStorageService.getAuthorizationToken();
    if (isTruthy(authToken)) {
      return AUTHORIZATION_BEARER.replace('{}', this.localStorageService.getAuthorizationToken());
    }
    return '';
  }

  private getRefreshToken(): string {
    const refreshToken: string = this.localStorageService.getAuthorizationRefreshToken();
    if (isTruthy(refreshToken)) {
      return AUTHORIZATION_BEARER.replace('{}', refreshToken);
    }
    return '';
  }

  private isWhitelisted(url: string): boolean {
    url = this.getRequestPath(url);
    return this.WHITELIST.some((excludedUrl: string) => url.startsWith(excludedUrl));
  }

  private isWhitelistedExt(url: string): boolean {
    return this.EXTERNAL_WHITELIST.some((excludedUrl: string): boolean => url.includes(excludedUrl));
  }

  private getRequestPath(url: string): string {
    return url.replace(API_HOST_URL + "/", "")
      .replace(API_BASE_PATH, "");
  }
}
