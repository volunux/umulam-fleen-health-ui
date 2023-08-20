import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";
import {map, Observable} from "rxjs";
import {AuthVerificationDto, ChangePasswordDto, ResendVerificationCodeDto} from "../../shared/type/authentication";
import {LocalStorageService} from "../../base/service/local-storage.service";
import {AUTHORIZATION_TOKEN_KEY, REFRESH_AUTHORIZATION_TOKEN_KEY} from "../../shared/constant/other-constant";
import {SignInResponse} from "../response/sign-in-response";
import {SignUpResponse} from "../response/sign-up-response";
import {SignInUpResponse} from "../response/sign-in-up-response";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";
  private readonly VERIFICATION_BASE_PATH: string = "verification";

  constructor(private httpService: HttpClientService,
              private localStorageService: LocalStorageService) { }

  public isEmailExists(emailAddress: string): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest(['email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

  public signUp(data: any): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], {}, data);
    return this.httpService.post(req)
      .pipe(
        map(data => new SignUpResponse(data))
      );
  }

  public signIn(data: any): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-in'], {}, data);
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
  }

  public completeSignUp(verificationDto: AuthVerificationDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'confirm-sign-up'], {}, { ...verificationDto });
    return this.httpService.post(req);
  }

  public validateSignInMfa(verificationDto: AuthVerificationDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'validate-sign-in-mfa'], {}, { ...verificationDto });
    return this.httpService.post(req);
  }

  public completeOnboarding(dto: ChangePasswordDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'complete-onboarding'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public resendOtp(resendVerificationDto: ResendVerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-verification-code'], {}, { ...resendVerificationDto });
    return this.httpService.post(req);
  }

  public resendPreAuthenticationOtp(resendVerificationDto: ResendVerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-authentication-code'], {}, { ...resendVerificationDto });
    return this.httpService.post(req);
  }

  public saveAuthToken(token: string): void {
    this.localStorageService.setObject(AUTHORIZATION_TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    this.localStorageService.setObject(REFRESH_AUTHORIZATION_TOKEN_KEY, token);
  }

  public setAuthToken(result: SignInUpResponse): void {
    this.saveAuthToken(result.accessToken || '');
    this.saveRefreshToken(result.refreshToken || '');
  }

}
