import {AuthVerificationDto, ChangePasswordDto} from "../../../shared/type/authentication";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {AuthenticationService} from "../../service/authentication.service";
import {Observable, of} from "rxjs";
import {AuthVerificationType, ChangePasswordType} from "../../../shared/enum/authentication";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {ChangePasswordComponent} from "../onboarding-verification/change-password.component";

export abstract class AuthBaseComponent extends BaseFormComponent {

  public handleVerificationCode(verification: AuthVerificationDto): void {
    if (isTruthy(verification.code) && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.completeSignUpOrValidateMfaOrOnboarding(verification)
        .subscribe({
          next: (result: any): void => {
            this.getAuthenticationService().setAuthToken(result);
          },
          error: (result): void => {
            const { error } = result;
            if (verification.type === AuthVerificationType.VERIFICATION) {
              if (isTruthy(this.getOtpComponent())) {
                this.getOtpComponent()?.setErrorMessage(error.message);
              }
            } else if (verification.type === AuthVerificationType.MFA) {
              if (isTruthy(this.getMfaVerificationComponent())) {
                this.getMfaVerificationComponent()?.setErrorMessage(error.message);
              }
            }
            this.isSubmitting = false;
          },
          complete: (): void => {
            this.disableSubmitting();
          }
      });
    }
  }

  public changePassword(dto: ChangePasswordDto): void {
    if (isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.completeChangePassword(dto)
        .subscribe({
          next: (result: any): void => {
            this.getAuthenticationService().setAuthToken(result);
          },
          error: (result): void => {
            const { error } = result;
            if (isTruthy(this.getChangePasswordComponent())) {
              this.getChangePasswordComponent()?.setErrorMessage(error.message);
            }
            this.isSubmitting = false;
          },
          complete: (): void => {
            this.disableSubmitting();
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
}
