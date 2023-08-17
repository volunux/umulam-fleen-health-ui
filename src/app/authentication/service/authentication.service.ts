import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";

  constructor(private httpService: HttpClientService) { }

  public isEmailExists(emailAddress: string): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

}
