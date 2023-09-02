import {HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD' | 'TRACE';


export type BaseRequest = {
  pathParams?: (string | number | boolean | object | any)[],
  queryParams?: {[key: string] : any} | undefined,
  body?: any,
  method?: RequestMethod,
}

export type ExchangeRequest = {
  uri: string
  method?: RequestMethod,
  pathParams?: (string | number | boolean | object | any)[],
  queryParams?: {[key: string] : any} | undefined,
  body?: any,
  headers?: HttpHeaders
}

export type FileUploadRequest = {
  request: Observable<any>,
  abort: Subject<void>
}
