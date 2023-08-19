import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AUTHORIZATION_BEARER, AUTHORIZATION_HEADER} from "../../shared/constant/other-constant";
import {LocalStorageService} from "../service/local-storage.service";
import {API_BASE_PATH, API_HOST_URL} from "../../shared/constant/base-config";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private readonly EXCLUDED_URLS: string[] = [
    '/auth/sign-in',
    '/auth/sign-up',
    '/email-address'
  ];

  public constructor(private localStorageService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcluded(request.url)) {
      return next.handle(request);
    }

    const authHeader: string = AUTHORIZATION_BEARER.replace('{}', this.localStorageService.getAuthorizationToken());
    const authRequest: HttpRequest<any> = request.clone({ setHeaders: { [AUTHORIZATION_HEADER]: authHeader } });
    return next.handle(authRequest);
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
