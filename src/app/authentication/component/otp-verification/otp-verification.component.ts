import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {codeValidator} from "../../../shared/validator/validator";
import {VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {ResendVerificationCodeDto, VerificationCodeDto, VerificationType} from "../../../shared/type/authentication";
import {AuthenticationService} from "../../service/authentication.service";
import {isFalsy} from "../../../shared/util/helpers";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent extends BaseFormComponent {

  public verificationType: VerificationType = 'EMAIL';
  public otp: FormControl = new FormControl<string>('');
  @Input('email-address') public emailAddress: string | undefined;
  @Input('phone-number') public phoneNumber: string | undefined;
  @Output() public otpSubmitted: EventEmitter<VerificationCodeDto> = new EventEmitter<VerificationCodeDto>();

  public constructor(private authenticationService: AuthenticationService) {
    super();
    this.otp = new FormControl<any>('', [
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)
    ]);
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({code, verificationType: this.verificationType });
    }
  }

  public resendOtp(): void {
    if (isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      const verificationDto: ResendVerificationCodeDto = this.toResendVerificationCodeDto();
      this.authenticationService.resendOtp(verificationDto)
        .subscribe({
          error: (result: any): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.isSubmitting = false;
          }
      });
    }
  }

  public tryAnotherMethod(event: Event): void {
    this.stopEvent(event);
    this.verificationType = this.verificationType == 'EMAIL'
      ? 'PHONE'
      : 'EMAIL';
    this.resendOtp();
  }

  get verificationMethod(): string {
    let verificationMessage: string = 'Code has been sent to your '
    verificationMessage = this.verificationType == "EMAIL"
      ? verificationMessage.concat(`email address ${this.emailAddress}`)
      : verificationMessage.concat(`phone number ${this.phoneNumber}`);
    return verificationMessage;
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  public toResendVerificationCodeDto(): ResendVerificationCodeDto {
    return { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
  }

}
