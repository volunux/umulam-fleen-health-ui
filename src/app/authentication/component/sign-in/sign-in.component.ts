import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {SignInResponse} from "../../response/sign-in.response";
import {
  AuthenticationStatus,
  ChangePasswordType,
  MfaType,
  NextAuthentication
} from "../../../shared/enum/authentication";
import {MfaVerificationComponent} from "../mfa-verification/mfa-verification.component";
import {ChangePasswordComponent} from "../../../shared/change-password/change-password.component";
import {ErrorResponse} from "../../../base/response/error-response";
import {Router} from "@angular/router";
import {SessionStorageService} from "../../../base/service/session-storage.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignInBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  @ViewChild(MfaVerificationComponent) mfaVerificationComponent!: MfaVerificationComponent;

  public mfaType: MfaType = MfaType.NONE;
  public changePasswordType: ChangePasswordType = ChangePasswordType.NONE;
  protected phoneNumber: string | undefined;
  public isVerificationStage: boolean = false;
  public isPreVerificationStage: boolean = false;
  public isMfaVerificationStage: boolean = false;
  public isChangePasswordStage: boolean = false;

  constructor(protected authenticationService: AuthenticationService,
              protected sessionStorageService: SessionStorageService,
              protected formBuilder: FormBuilder,
              protected router: Router) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    if (this.authenticationService.isAuthenticationStatusCompleted()) {
      await this.goHome();
    } else {
      this.authenticationService.clearAuthTokens();
    }
    this.initForm();
  }

  protected override getSessionStorageService(): SessionStorageService {
    return this.sessionStorageService;
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

  override getMfaVerificationComponent(): MfaVerificationComponent {
    return this.mfaVerificationComponent;
  }

  override getChangePasswordComponent(): ChangePasswordComponent | null {
    return null;
  }

  public signIn(): void {
    if (isTruthy(this.signInForm) && this.signInForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.authenticationService.signIn(this.signInForm.value)
        .subscribe({
          next: (result: SignInResponse): void => {
            this.phoneNumber = result.phoneNumber;
            this.authenticationService.setAuthToken(result);
            this.isVerificationStage = true;
            if (result.authenticationStatus === AuthenticationStatus.IN_PROGRESS) {
              this.setVerificationStage(result);
            }
            if (result.authenticationStatus === AuthenticationStatus.COMPLETED) {
              this.gotoUserDestinationPage();
            }
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
    return this.signInForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string | undefined {
    return this?.phoneNumber;
  }

  private setVerificationStage(result: SignInResponse): void {
    const { nextAuthentication: stage, mfaType } = result;
    if (stage == NextAuthentication.PRE_VERIFICATION) {
      this.isPreVerificationStage = true;
    } else if (stage == NextAuthentication.MFA_OR_PRE_AUTHENTICATION) {
      this.mfaType = mfaType;
      this.isMfaVerificationStage = true;
    } else if (stage == NextAuthentication.PRE_ONBOARDED) {
      this.isChangePasswordStage = true;
      this.changePasswordType = ChangePasswordType.ONBOARDING;
    }
  }

  protected override getRouter(): Router {
    return this.router;
  }
}
