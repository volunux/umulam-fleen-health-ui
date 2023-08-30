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
import {
  AUTHENTICATION_STATUS_KEY,
  AUTHORIZATION_TOKEN_KEY,
  REFRESH_AUTHORIZATION_TOKEN_KEY
} from "../../shared/constant/other-constant";
import {SignInResponse} from "../response/sign-in.response";
import {SignUpResponse} from "../response/sign-up.response";
import {SignInUpResponse} from "../response/sign-in-up.response";
import {ForgotPasswordResponse} from "../response/forgot-password.response";
import {InitiatePasswordChangeResponse} from "../response/initiate-password-change.response";
import {FleenHealthResponse} from "../../shared/response/fleen-health.response";
import {Router} from "@angular/router";
import {EntityExistsResponse} from "../../shared/response/entity-exists.response";
import {SignInDto, SignUpDto} from "../type/authentication";
import {JwtService} from "../../base/service/jwt.service";
import {AnyProp} from "../../shared/type/base";
import {AuthenticationStatus} from "../../shared/enum/authentication";
import {hasAtLeastAProperty} from "../../shared/util/helpers";
import {AUTHENTICATION_ENTRY_POINT} from "../../shared/constant/base-config";

@Injectable()
export class AuthenticationService {

  private readonly BASE_PATH: string = "auth";
  private readonly VERIFICATION_BASE_PATH: string = "verification";

  constructor(private httpService: HttpClientService,
              private localStorageService: LocalStorageService,
              private jwtService: JwtService) { }

  public isEmailExists(emailAddress: string): Observable<EntityExistsResponse> {
    const req: BaseRequest = this.httpService.toRequest(['email-address', 'exists'], { emailAddress });
    return this.httpService.get(req);
  }

  public signUp(body: SignUpDto): Observable<SignUpResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-up'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignUpResponse(data))
      );
  }

  public signIn(body: SignInDto): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'sign-in'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
  }

  public completeSignUp(body: AuthVerificationDto): Observable<SignUpResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'confirm-sign-up'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignUpResponse(data))
      );
  }

  public validateSignInMfa(body: AuthVerificationDto): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'validate-sign-in-mfa'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
  }

  public completeOnboarding(body: ChangePasswordDto): Observable<SignInResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'complete-onboarding'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new SignInResponse(data))
      );
  }

  public resendOtp(body: ResendVerificationCodeDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-verification-code'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public resendPreAuthenticationOtp(body: ResendVerificationCodeDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'resend-pre-authentication-code'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
      );
  }

  public forgotPassword(body: ForgotPasswordDto): Observable<ForgotPasswordResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'forgot-password'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new ForgotPasswordResponse(data))
      );
  }

  public verifyResetPasswordCode(body: ResetPasswordDto): Observable<InitiatePasswordChangeResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'verify-reset-password-code'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new InitiatePasswordChangeResponse(data))
      );
  }

  public resetAndChangePassword(body: ChangePasswordDto): Observable<FleenHealthResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.VERIFICATION_BASE_PATH, 'reset-change-password'], null, { ...body });
    return this.httpService.post(req)
      .pipe(
        map(data => new FleenHealthResponse(data))
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

  public startAuthentication(router: Router): void {
    router.navigate([AUTHENTICATION_ENTRY_POINT])
      .then((r: boolean) => r);
  }

  public isAuthenticated(): boolean {
    return this.jwtService.isTokenValid(this.localStorageService.getAuthorizationToken());
  }

  public isAuthenticationStatusCompleted(): boolean {
    return this.isAuthenticated()
      && this.getJwtClaims() !== null
      && hasAtLeastAProperty(this.getJwtClaims())
      && (this.getJwtClaims()[AUTHENTICATION_STATUS_KEY]) === AuthenticationStatus.COMPLETED;
  }

  private getJwtClaims(): AnyProp {
    return this.jwtService.getAuthClaims();
  }

}
