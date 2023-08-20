import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, delay, EMPTY, Observable, of, switchMap, tap} from 'rxjs';
import {AUTHORIZATION_BEARER, AUTHORIZATION_HEADER} from "../../shared/constant/other-constant";
import {LocalStorageService} from "../service/local-storage.service";
import {API_BASE_PATH, API_HOST_URL} from "../../shared/constant/base-config";
import {Router} from "@angular/router";
import {BaseHttpService} from "../../shared/service/base-http.service";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {Location} from "@angular/common";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private readonly API_REFRESH_TOKEN_ENDPOINT: string = 'verification/refresh-token';
  private readonly AUTHENTICATION_ENTRY_POINT: string = '/auth/sign-in';
  private readonly EXCLUDED_URLS: string[] = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/email-address'
  ];

  public constructor(private localStorageService: LocalStorageService,
                     private baseHttpService: BaseHttpService,
                     private authenticationService: AuthenticationService,
                     private router: Router,
                     private location: Location) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcluded(request.url)) {
      return next.handle(request).pipe(
        delay(3000)
      );
    }

    const authRequest: HttpRequest<any> = request.clone({ setHeaders: { [AUTHORIZATION_HEADER]: this.getAccessToken() } });
    return next.handle(authRequest).pipe(
      delay(3000),
      catchError((response: HttpErrorResponse): Observable<any> => {
        const { error } = response;
        if (error.status === 401) {
          return this.handleUnauthorized(authRequest, next);
        }
        return this.baseHttpService.handleError(error);
      })
    );
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const refreshRequest: HttpRequest<any> = request.clone({
      setHeaders: { [AUTHORIZATION_HEADER]: this.getRefreshToken() },
      url: this.baseHttpService.buildPathUri(this.API_REFRESH_TOKEN_ENDPOINT),
      method: 'GET'
    });

    return next.handle(refreshRequest).pipe(
      delay(3000),
      tap((value: HttpEvent<any>): void => {
        if (value instanceof HttpResponse) {
          const { body } = value as HttpResponse<any>;
          this.authenticationService.setAuthToken(body);
          this.gotoDestination();
        }
      }),
      catchError(() => {
        this.localStorageService.clearAuthorizationTokens();
        this.startAuthentication();
        return EMPTY;
      }),
      switchMap(() => of(EMPTY))
    );
  }

  private startAuthentication(): void {
    this.router.navigate([this.AUTHENTICATION_ENTRY_POINT])
      .then((r: boolean) => r);
  }

  private gotoDestination(): void {
    this.router.navigate([this.location.path()])
      .then((r: boolean) => r);
  }

  private getAccessToken(): string {
    return AUTHORIZATION_BEARER.replace('{}', this.localStorageService.getAuthorizationToken());
  }

  private getRefreshToken(): string {
    return AUTHORIZATION_BEARER.replace('{}', this.localStorageService.getAuthorizationRefreshToken());
  }

  private isExcluded(url: string): boolean {
    url = this.getRequestPath(url);
    return this.EXCLUDED_URLS.some(excludedUrl => url.startsWith(excludedUrl));
  }

  private getRequestPath(url: string): string {
    return url.replace(API_HOST_URL + "/", "")
      .replace(API_BASE_PATH, "");
  }
}
