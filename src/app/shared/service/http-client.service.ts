import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "./logger.service";
import {BaseRequest} from "../type/http";
import {BaseHttpService} from "./base-http.service";
import {Observable} from "rxjs";

@Injectable()
export class HttpClientService extends BaseHttpService {

  constructor(protected httpClient: HttpClient, logger: LoggerService) {
    super(logger);
  }

  public request(req: BaseRequest): Observable<Object> {
    const { body } = req;
    const request: Observable<Object> = this.httpClient.request(req.method, this.buildUri(req), { body });
    return this.pipeline(request);
  }


  public get(req: BaseRequest): Observable<Object> {
    const request: Observable<Object> = this.httpClient.get(this.buildUri(req));
    return this.pipeline(request);
  }

  public getOne(req: BaseRequest): Observable<Object> {
    return this.get(req);
  }

  public save(req: BaseRequest): Observable<Object> {
    const request: Observable<Object> = this.httpClient.post(this.buildUri(req), req.body);
    return this.pipeline(request);
  }

  public saveMany(req: BaseRequest): Observable<Object> {
    return this.save(req);
  }

  public update(req: BaseRequest): Observable<Object> {
    const request: Observable<Object> = this.httpClient.put(this.buildUri(req), req.body);
    return this.pipeline(request);
  }

  public delete(req: BaseRequest): Observable<Object> {
    const request: Observable<Object> = this.httpClient.delete(this.buildUri(req));
    return this.pipeline(request);
  }

  public deleteMany(req: BaseRequest): Observable<Object> {
    return this.request(req);
  }

}

