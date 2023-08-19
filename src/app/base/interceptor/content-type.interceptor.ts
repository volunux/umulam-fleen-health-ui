import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SUPPORTED_CONTENT_TYPES} from "../../shared/constant/enum-constant";
import {CONTENT_TYPE_APPLICATION_JSON} from "../../shared/constant/other-constant";

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!SUPPORTED_CONTENT_TYPES.includes(<string>request.headers.get('Content-Type'))) {
      const modifiedRequest: HttpRequest<any> = request.clone({
        setHeaders: { 'Content-Type': CONTENT_TYPE_APPLICATION_JSON },
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
