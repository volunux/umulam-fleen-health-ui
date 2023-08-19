import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {codeValidator} from "../../../shared/validator/validator";
import {VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {ResendVerificationCodeDto, VERIFICATION_TYPE, VerificationCodeDto} from "../../../shared/type/authentication";
import {AuthenticationService} from "../../service/authentication.service";
import {isFalsy} from "../../../shared/util/helpers";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {

  protected errorMessage: string | undefined;
  public verificationType: VERIFICATION_TYPE = 'EMAIL';
  @Input('phone-number') public phoneNumber: string | undefined;
  @Input('email-address') public emailAddress: string | undefined;
  public isSubmitting: boolean = false;

  public constructor(private authenticationService: AuthenticationService) { }

  @Output() public otpSubmitted: EventEmitter<VerificationCodeDto> = new EventEmitter<VerificationCodeDto>();
  public otp: FormControl = new FormControl<any>('', [
    Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)
  ]);

  public submit(): void {
    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({code, verificationType: this.verificationType });
    }
  }

  public resendOtp(): void {
    console.log("Got here");
    console.log("Submission status " + this.isSubmitting);
    if (isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      const verificationDto: ResendVerificationCodeDto = { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
      console.log("Verification DTO");
      console.log(verificationDto);

      this.authenticationService.resendOtp(verificationDto)
        .subscribe({
          next: (result): void => {
          },
          error: (result): void => {
            const { error } = result;
            this.errorMessage = error.message;
            this.isSubmitting = false;
          },
          complete: (): void => {
            this.isSubmitting = false;
          }
        })
    }

  }

  public tryAnotherMethod($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
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

}
