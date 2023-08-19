import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";
import {Observable} from "rxjs";
import {VerificationCodeDto} from "../../shared/type/authentication";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";

  constructor(private httpService: HttpClientService) { }

  public isEmailExists(emailAddress: string): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

  public signUp(data: any): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], {}, data);
    return this.httpService.save(req);
  }

  public confirmSignUp(verificationDto: VerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verification', 'confirm-sign-up'], {}, { ...verificationDto });
    return this.httpService.save(req);
  }

}
