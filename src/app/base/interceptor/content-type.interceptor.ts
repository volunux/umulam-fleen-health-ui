import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {debounceTime, delay, Observable} from 'rxjs';
import {SUPPORTED_CONTENT_TYPES} from "../../shared/constant/enum-constant";
import {CONTENT_TYPE_APPLICATION_JSON, CONTENT_TYPE_HEADER_KEY} from "../../shared/constant/other-constant";

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!SUPPORTED_CONTENT_TYPES.includes(<string>request.headers.get(CONTENT_TYPE_HEADER_KEY))) {
      const modifiedRequest: HttpRequest<any> = request.clone({
        setHeaders: { [CONTENT_TYPE_HEADER_KEY]: CONTENT_TYPE_APPLICATION_JSON },
      });
      return next.handle(modifiedRequest).pipe(debounceTime(3000));
    }
    return next.handle(request).pipe(debounceTime(3000));
  }
}
