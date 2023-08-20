import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {SignInResponse} from "../../response/sign-in-response";
import {NextAuthentication} from "../../../shared/enum/authentication";
import {AuthVerificationDto} from "../../../shared/type/authentication";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignInBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isPreVerificationStage: boolean = false;
  protected phoneNumber: string | undefined;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
  }

  public signIn(): void {
    if (isTruthy(this.signInForm) && this.signInForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.signIn(this.signInForm.value)
        .subscribe({
          next: (result: SignInResponse): void => {
            this.phoneNumber = result.phoneNumber;
            this.authenticationService.setAuthToken(result);
            this.setVerificationStage(result.nextAuthentication);
          },
          error: (result: any): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.disableSubmitting();
          }
        });
    }
  }

  public handleMfaVerificationCode(verification: AuthVerificationDto): void {
    if (isTruthy(verification.code) && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.getAuthenticationService().validateSignInMfa(verification)
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

  get $emailAddress(): string {
    return this.signInForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string | undefined {
    return this?.phoneNumber;
  }

  private setVerificationStage(stage: NextAuthentication): void {
    if (stage == "PRE_VERIFICATION") {
      this.isPreVerificationStage = true;
    }
  }

}
