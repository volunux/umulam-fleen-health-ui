import { Injectable } from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";

  constructor(private httpService: HttpClientService) { }

  public isEmailExists(emailAddress: string) {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'email-address', 'exist', emailAddress]);
    return this.httpService.get(req);
  }

}
