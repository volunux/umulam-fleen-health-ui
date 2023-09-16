import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {ChangePasswordType, VerificationType} from "../../../shared/enum/authentication.enum";
import {isFalsy} from "../../../shared/util/helpers";
import {ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto} from "../../../shared/type/authentication";
import {ForgotPasswordResponse} from "../../response/forgot-password.response";
import {InitiatePasswordChangeResponse} from "../../response/initiate-password-change.response";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {codeOrOtpValidator} from "../../../shared/validator/validator";
import {VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {Router} from "@angular/router";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state for entering elements
      transition('void <=> *', animate('300ms ease-in-out')), // Transition between states
    ]),
  ],
})
export class ForgotPasswordComponent extends BaseFormComponent implements OnInit {

  public emailAddress: FormControl = new FormControl<string>('');
  public verificationCode: FormControl = new FormControl<string>('');
  public changePasswordType: ChangePasswordType = ChangePasswordType.RESET;
  public isDetailValid: boolean = false;
  public isChangePasswordStage: boolean = false;
  public phoneNumber: string | undefined;
  protected formBuilder;

  public constructor(protected authenticationService: AuthenticationService,
                     protected router: Router) {
    super();
  }

  ngOnInit(): void {
    this.emailAddress.addValidators([
      Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)
    ]);
    this.verificationCode.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
  }

  protected override getRouter(): Router {
    return this.router;
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const dto: ForgotPasswordDto = { emailAddress, verificationType: VerificationType.EMAIL };
      this.authenticationService.clearAuthTokens();
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.forgotPassword(dto)
        .subscribe({
          next: (result: ForgotPasswordResponse): void => {
            this.phoneNumber = result.phoneNumber;
            this.isDetailValid = true;
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

  public submitOtp(event: Event): void {
    this.stopEvent(event);
    if (this.emailAddress.valid && this.verificationCode.valid && isFalsy(this.isSubmitting)) {
      const emailAddress: string = this.emailAddress.value.toString();
      const dto: ResetPasswordDto = { emailAddress, code: this.verificationCode.value };
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.verifyResetPasswordCode(dto)
        .subscribe({
          next: (result: InitiatePasswordChangeResponse): void => {
            this.authenticationService.clearAuthTokens();
            this.authenticationService.saveAuthToken(result.accessToken);
            this.isChangePasswordStage = true;
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

  public changePassword(dto: ChangePasswordDto): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.authenticationService.resetAndChangePassword(dto)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.authenticationService.clearAuthTokens();
            this.authenticationService.startAuthentication(this.router);
          }
      });
    }
  }

}
