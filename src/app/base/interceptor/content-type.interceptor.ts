import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SUPPORTED_CONTENT_TYPES} from "../../shared/constant/enum-constant";
import {CONTENT_TYPE_APPLICATION_JSON, CONTENT_TYPE_HEADER_KEY} from "../../shared/constant/other-constant";
import {AnyProp} from "../../shared/type/base";
import {isFalsy} from "../../shared/util/helpers";

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  public constructor() { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isFalsy(this.isContentTypeSupported(request))) {
      request = request.clone({ setHeaders: this.getDefaultHeaders() });
    }
    return next.handle(request);
  }

  private getDefaultHeaders(): AnyProp {
    return { [CONTENT_TYPE_HEADER_KEY]: CONTENT_TYPE_APPLICATION_JSON };
  }

  private isContentTypeSupported(req: HttpRequest<any>): boolean {
    return SUPPORTED_CONTENT_TYPES.includes(this.getContentTypeHeaders(req));
  }

  private getContentTypeHeaders(request: HttpRequest<any>): string {
    return <string>request.headers.get(CONTENT_TYPE_HEADER_KEY);
  }
}
