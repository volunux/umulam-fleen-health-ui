import {VerificationCodeDto} from "../../../shared/type/authentication";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {AuthenticationService} from "../../service/authentication.service";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";

export abstract class SignInUpBaseComponent extends BaseFormComponent {

  public handleVerificationCode(verification: VerificationCodeDto): void {
    if (isTruthy(verification.code) && this.fleenHealthForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.getAuthenticationService().confirmSignUp(verification)
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

  abstract getOtpComponent(): OtpVerificationComponent
}
