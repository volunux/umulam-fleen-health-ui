import {AuthVerificationDto} from "../../../shared/type/authentication";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {AuthenticationService} from "../../service/authentication.service";
import {MfaOtpBaseComponent} from "../mfa-otp-base/mfa-otp-base.component";
import {Observable, of} from "rxjs";
import {AuthVerificationType} from "../../../shared/enum/authentication";

export abstract class SignInUpBaseComponent extends BaseFormComponent {

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
            this.getOtpComponent().setErrorMessage(error.message);
            this.isSubmitting = false;
          },
          complete: (): void => {
            this.disableSubmitting();
          }
        });
    }
  }

  abstract getAuthenticationService(): AuthenticationService;

  abstract getOtpComponent(): MfaOtpBaseComponent;

  protected completeSignUpOrValidateMfaOrOnboarding(verification: AuthVerificationDto): Observable<any> {
    if (verification.type === AuthVerificationType.MFA) {
      return this.getAuthenticationService().validateSignInMfa(verification);
    } else if (verification.type === AuthVerificationType.VERIFICATION) {
      return this.getAuthenticationService().completeSignUp(verification);
    } else {
      return of({});
    }
  }
}
