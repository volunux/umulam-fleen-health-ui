import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {SignUpResponse} from "../../response/sign-up.response";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {ChangePasswordComponent} from "../change-password/change-password.component";
import {ErrorResponse} from "../../../base/response/error-response";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../../base/service/session-storage.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isPreVerificationStage: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              protected formBuilder: FormBuilder,
              protected router: Router,
              protected sessionStorageService: SessionStorageService) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected override getSessionStorageService(): SessionStorageService {
    return this.sessionStorageService;
  }

  protected override getRouter(): Router {
    return this.router;
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
  }

  override getMfaVerificationComponent(): MfaVerificationComponent | null {
    return null;
  }

  override getChangePasswordComponent(): ChangePasswordComponent | null {
    return null;
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public signUp(): void {
    if (isTruthy(this.signUpForm) && this.signUpForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.resetErrorMessage();
      this.authenticationService.signUp(this.signUpForm.value)
        .subscribe({
          next: (result: SignUpResponse): void => {
            this.isPreVerificationStage = true;
            this.authenticationService.setAuthToken(result);
          },
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  get $emailAddress(): string {
    return this.signUpForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string {
    return this.signUpForm?.get('phoneNumber')?.value;
  }

}
