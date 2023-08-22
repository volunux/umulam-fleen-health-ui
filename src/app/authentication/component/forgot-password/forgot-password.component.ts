import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {FormControl, Validators} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {VerificationType} from "../../../shared/enum/authentication";
import {isFalsy} from "../../../shared/util/helpers";
import {ForgotPasswordDto, ResetPasswordDto} from "../../../shared/type/authentication";
import {ForgotPasswordResponse} from "../../response/forgot-password-response";
import {InitiatePasswordChangeResponse} from "../../response/initiate-password-change-response";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  public isDetailValid: boolean = false;
  public phoneNumber: string | undefined;

  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.emailAddress.addValidators([
      Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(150)
    ]);
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    const emailAddress: string = this.emailAddress.value.toString();
    const dto: ForgotPasswordDto = { emailAddress, verificationType: VerificationType.EMAIL };
    if (this.emailAddress.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.authenticationService.forgotPassword(dto)
        .subscribe({
          next: (result: ForgotPasswordResponse): void => {
            this.phoneNumber = result.phoneNumber;
            this.isDetailValid = true;
          },
          error: (result: any): void => {
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
    const emailAddress: string = this.emailAddress.value.toString();
    if (this.emailAddress.valid && this.verificationCode.valid && isFalsy(this.isSubmitting)) {
      const dto: ResetPasswordDto = { emailAddress, code: this.verificationCode.value };
      this.disableSubmitting();
      this.authenticationService.verifyResetPasswordCode(dto)
        .subscribe({
          next: (result: InitiatePasswordChangeResponse): void => {
            this.authenticationService.clearAuthTokens();
            this.authenticationService.saveAuthToken(result.accessToken);
          },
          error: (result: any): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

}
