import {AuthVerificationDto, ChangePasswordDto} from "../../../shared/type/authentication";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {AuthenticationService} from "../../service/authentication.service";
import {Observable, of} from "rxjs";
import {AuthenticationStatus, AuthVerificationType, ChangePasswordType} from "../../../shared/enum/authentication";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {ErrorResponse} from "../../../base/response/error-response";
import {SignInUpResponse} from "../../response/sign-in-up.response";
import {USER_DESTINATION_PAGE_KEY} from "../../../shared/constant/other-constant";
import {SessionStorageService} from "../../../base/service/session-storage.service";

export abstract class AuthBaseComponent extends BaseFormComponent {

  protected abstract getSessionStorageService(): SessionStorageService;

  public handleVerificationCode(verification: AuthVerificationDto): void {
    if (isTruthy(verification.code) && isFalsy(this.isSubmitting)) {
      const { type } = verification;
      this.disableSubmitting();
      this.resetHandleVerificationCodeErrorMessage(type);

      this.completeSignUpOrValidateMfaOrOnboarding(verification)
        .subscribe({
          next: (result: SignInUpResponse): void => {
            this.getAuthenticationService().setAuthToken(result);
            if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
              this.gotoUserDestinationPage();
            }
          },
          error: (error: ErrorResponse): void => {
            this.setHandleVerificationCodeErrorMessage(type, error.message);
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public changePassword(dto: ChangePasswordDto): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.completeChangePassword(dto)
        .subscribe({
          next: (result: SignInUpResponse): void => {
            this.getAuthenticationService().setAuthToken(result);
            if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
              this.gotoUserDestinationPage();
            }
          },
          error: (error: ErrorResponse): void => {
            if (isTruthy(this.getChangePasswordComponent())) {
              this.getChangePasswordComponent()?.setErrorMessage(error.message);
            }
            this.enableSubmitting();
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  abstract getAuthenticationService(): AuthenticationService;

  abstract getOtpComponent(): OtpVerificationComponent | null;

  abstract getMfaVerificationComponent(): MfaVerificationComponent | null;

  abstract getChangePasswordComponent(): ChangePasswordComponent | null;

  protected completeSignUpOrValidateMfaOrOnboarding(verification: AuthVerificationDto): Observable<any> {
    const { type } = verification;
    if (type === AuthVerificationType.MFA) {
      return this.getAuthenticationService().validateSignInMfa(verification);
    } else if (type === AuthVerificationType.VERIFICATION) {
      return this.getAuthenticationService().completeSignUp(verification);
    } else {
      return of({});
    }
  }

  protected completeChangePassword(dto: ChangePasswordDto): Observable<any> {
    const { type } = dto;
    if (type === ChangePasswordType.ONBOARDING) {
      return this.getAuthenticationService().completeOnboarding(dto);
    } else {
      return of({});
    }
  }

  protected resetHandleVerificationCodeErrorMessage(type: AuthVerificationType): void {
    if (isTruthy(this.getOtpComponent()) || isTruthy(this.getMfaVerificationComponent())) {
      if (type === AuthVerificationType.VERIFICATION) {
        this.getOtpComponent()?.resetErrorMessage();
      } else if (type === AuthVerificationType.MFA) {
        this.getMfaVerificationComponent()?.resetErrorMessage();
      }
    }
  }

  protected setHandleVerificationCodeErrorMessage(type: AuthVerificationType, message: string): void {
    if (isTruthy(this.getOtpComponent()) || isTruthy(this.getMfaVerificationComponent())) {
      if (type === AuthVerificationType.VERIFICATION) {
        this.getOtpComponent()?.setErrorMessage(message);
      } else if (type === AuthVerificationType.MFA) {
        this.getMfaVerificationComponent()?.setErrorMessage(message);
      }
    }
  }

  protected gotoUserDestinationPage(): void {
    this.getRouter().navigateByUrl(this.getUserDestinationPage())
      .then((m: boolean) => m);
  }

  private getUserDestinationPage(): string {
    return this.getSessionStorageService().getObject(USER_DESTINATION_PAGE_KEY) || '';
  }
}
