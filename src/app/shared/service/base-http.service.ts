import {Injectable} from '@angular/core';
import {LoggerService} from "./logger.service";
import {API_BASE_PATH, API_HOST_URL, HTTP_REQUEST_RETRY_TIMES} from "../constant/base-config";
import {isObject, isTruthy} from "../util/helpers";
import {AnyArray, AnyProp} from "../type/base";
import {BaseRequest, RequestMethod} from "../type/http";
import {catchError, map, Observable, retry, tap, throwError} from "rxjs";
import {toBody, toCamelCaseKeys, toSnakeCase} from "../transformer/transformer";
import {ErrorResponse} from "../../base/response/error-response";

@Injectable()
export class BaseHttpService {

  protected HOST_URL: string = API_HOST_URL;
  protected BASE_PATH: string = API_BASE_PATH;
  protected RETRY_TIMES = HTTP_REQUEST_RETRY_TIMES;

  constructor(protected logger: LoggerService) { }

  protected getPath(parameters?: AnyArray): string {
    return isTruthy(parameters) && Array.isArray(parameters)
      ? parameters.join('/')
      : "";
  }

  protected getQueryString(params?: AnyProp) {
    return isObject(params)
      ? `?`.concat((new URLSearchParams(params)).toString())
      : "?";
  }

  protected buildUri(req: BaseRequest): string {
    return `${this.baseUri}/${this.getPath(req.pathParams)}${this.getQueryString(req.queryParams)}`
  }

  public buildPathUri(path: string): string {
    return this.buildUri({ pathParams: [path] });
  }

  get baseUri() {
    return `${this.HOST_URL}/${this.BASE_PATH}`;
  }

  public handleError(result: any): Observable<any> {
    return throwError(() => new ErrorResponse(result.error));
  }

  protected pipeline<T>(
    source: Observable<T>,
  ): Observable<T> {
    return source.pipe(
      retry(this.RETRY_TIMES),
      tap(this.logger.log),
      map(res => res),
      map(data => toCamelCaseKeys(data)),
      catchError(this.handleError)
    );
  }

  public toRequest(pathParams: AnyArray, queryParams?: AnyProp, bodyOrMethod?: AnyProp | RequestMethod, method?: RequestMethod): BaseRequest {
    if (typeof bodyOrMethod === 'string') {
      return {
        pathParams,
        queryParams: toSnakeCase(queryParams),
        method: isTruthy(method) ? method : bodyOrMethod,
      };
    } else {
      return {
        pathParams,
        queryParams,
        body: toBody(bodyOrMethod),
        method: isTruthy(method) ? method : 'GET',
      };
    }
  }
}
