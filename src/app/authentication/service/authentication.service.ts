import {Injectable} from '@angular/core';
import {HttpClientService} from "../../shared/service/http-client.service";
import {BaseRequest} from "../../shared/type/http";
import {map, Observable} from "rxjs";
import {
  AuthVerificationDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResendVerificationCodeDto,
  ResetPasswordDto
} from "../../shared/type/authentication";
import {LocalStorageService} from "../../base/service/local-storage.service";
import {AUTHORIZATION_TOKEN_KEY, REFRESH_AUTHORIZATION_TOKEN_KEY} from "../../shared/constant/other-constant";
import {SignInResponse} from "../response/sign-in-response";
import {SignUpResponse} from "../response/sign-up-response";
import {SignInUpResponse} from "../response/sign-in-up-response";
import {ForgotPasswordResponse} from "../response/forgot-password-response";
import {InitiatePasswordChangeResponse} from "../response/initiate-password-change-response";

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

  public completeSignUp(dto: AuthVerificationDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'confirm-sign-up'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public validateSignInMfa(dto: AuthVerificationDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'validate-sign-in-mfa'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public completeOnboarding(dto: ChangePasswordDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'complete-onboarding'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public resendOtp(dto: ResendVerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-verification-code'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public resendPreAuthenticationOtp(dto: ResendVerificationCodeDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-authentication-code'], {}, { ...dto });
    return this.httpService.post(req);
  }

  public forgotPassword(dto: ForgotPasswordDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'forgot-password'], {}, { ...dto });
    return this.httpService.post(req)
      .pipe(
        map(data => new ForgotPasswordResponse(data))
      );
  }

  public verifyResetPasswordCode(dto: ResetPasswordDto): Observable<any> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-reset-password-code'], {}, { ...dto });
    return this.httpService.post(req)
      .pipe(
        map(data => new InitiatePasswordChangeResponse(data))
      );
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

  public clearAuthTokens(): void {
    this.saveAuthToken('');
    this.saveRefreshToken('');
  }

}
