import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../../base/service/logger.service";
import {BaseRequest} from "../type/http";
import {BaseHttpService} from "./base-http.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService extends BaseHttpService {

  constructor(protected httpClient: HttpClient, logger: LoggerService) {
    super(logger);
  }

  public request(req: BaseRequest): Observable<any> {
    const { body } = req;
    const request: Observable<Object> = this.httpClient.request(req.method as string, this.buildUri(req), { body });
    return this.pipeline(request);
  }


  public get(req: BaseRequest): Observable<any> {
    const request: Observable<Object> = this.httpClient.get(this.buildUri(req));
    return this.pipeline(request);
  }

  public getOne(req: BaseRequest): Observable<any> {
    return this.get(req);
  }

  public post(req: BaseRequest): Observable<any> {
    const request: Observable<Object> = this.httpClient.post(this.buildUri(req), req.body);
    return this.pipeline(request);
  }

  public saveMany(req: BaseRequest): Observable<any> {
    return this.post(req);
  }

  public update(req: BaseRequest): Observable<any> {
    const request: Observable<Object> = this.httpClient.put(this.buildUri(req), req.body);
    return this.pipeline(request);
  }

  public delete(req: BaseRequest): Observable<any> {
    const request: Observable<Object> = this.httpClient.delete(this.buildUri(req));
    return this.pipeline(request);
  }

  public deleteMany(req: BaseRequest): Observable<any> {
    req.method = 'DELETE';
    return this.request(req);
  }

}

