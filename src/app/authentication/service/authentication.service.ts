import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";
import {map, Observable} from "rxjs";
import {ResendVerificationCodeDto, VerificationCodeDto} from "../../shared/type/authentication";
import {LocalStorageService} from "../../base/service/local-storage.service";
import {AUTHORIZATION_TOKEN_KEY, REFRESH_AUTHORIZATION_TOKEN_KEY} from "../../shared/constant/other-constant";
import {toCamelCaseKeys} from "../../shared/transformer/transformer";
import {SignInResponse} from "../response/sign-in-response";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";

  constructor(private httpService: HttpClientService,
              private localStorageService: LocalStorageService) { }

  public isEmailExists(emailAddress: string): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

  public signUp(data: any): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], {}, data);
    return this.httpService.post(req);
  }

  public signIn(data: any): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-in'], {}, data);
    return this.httpService.post(req)
      .pipe(
        map(data => toCamelCaseKeys(data)),
        map(data => new SignInResponse(data))
      );
  }

  public confirmSignUp(verificationDto: VerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['verification', 'confirm-sign-up'], {}, { ...verificationDto });
    return this.httpService.post(req);
  }

  public resendOtp(resendVerificationDto: ResendVerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['verification', 'resend-pre-verification-code'], {}, { ...resendVerificationDto });
    return this.httpService.post(req);
  }

  public saveAuthToken(token: string): void {
    this.localStorageService.setObject(AUTHORIZATION_TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    this.localStorageService.setObject(REFRESH_AUTHORIZATION_TOKEN_KEY, token);
  }

  public setAuthToken(result: any): void {
    this.saveAuthToken(result["access_token"]);
    this.saveRefreshToken(result["refresh_token"]);
  }

}
