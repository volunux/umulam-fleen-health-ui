import {isFalsy} from "../../../shared/util/helpers";
import {AuthVerificationDto, ResendVerificationCodeDto} from "../../../shared/type/authentication";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Observable, of} from "rxjs";
import {VerificationType} from "../../../shared/enum/authentication.enum";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {codeOrOtpValidator} from "../../../shared/validator/validator";
import {VERIFICATION_CODE} from "../../../shared/util/format-pattern";
import {ErrorResponse} from "../../../base/response/error-response";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mfa-otp-base',
  template: '',
  styles: ['']
})
export class MfaOtpBaseComponent extends BaseFormComponent implements OnInit {
  protected override formBuilder!: FormBuilder;

  public otp: FormControl = new FormControl<string>('');
  public verificationType: VerificationType = VerificationType.EMAIL;
  @Input('email-address') public emailAddress: string | undefined;
  @Input('phone-number') public phoneNumber: string | undefined;
  @Output() public otpSubmitted: EventEmitter<AuthVerificationDto> = new EventEmitter<AuthVerificationDto>();

  ngOnInit(): void {
    this.otp.addValidators([
      Validators.required, Validators.minLength(1), Validators.maxLength(6), codeOrOtpValidator(VERIFICATION_CODE)
    ]);
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  protected serviceResendOtp(resendVerificationDto: ResendVerificationCodeDto): Observable<any> {
    return of({})
  }

  public resendOtp(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      const verificationDto: ResendVerificationCodeDto = this.toResendVerificationCodeDto();
      this.serviceResendOtp(verificationDto)
        .subscribe({
          error: (result: ErrorResponse): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.enableSubmitting();
          }
      });
    }
  }

  public setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage || '';
  }

  public toResendVerificationCodeDto(): ResendVerificationCodeDto {
    return { verificationType: this.verificationType, emailAddress: this.emailAddress, phoneNumber: this.phoneNumber };
  }

  get verificationMessage(): string {
    return '';
  }

}
