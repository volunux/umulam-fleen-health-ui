import {Component} from '@angular/core';
import {ResendVerificationCodeDto} from "../../../shared/type/authentication";
import {AuthenticationService} from "../../service/authentication.service";
import {MfaOtpBaseComponent} from "../mfa-otp-base/mfa-otp-base.component";
import {Observable} from "rxjs";
import {AuthVerificationType, VerificationType} from "../../../shared/enum/authentication";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent extends MfaOtpBaseComponent {

  public constructor(private authenticationService: AuthenticationService) {
    super();
  }

  public submit(event: Event): void {
    this.stopEvent(event);
    if (this.otp.valid) {
      const code: string = this.otp.value.toString();
      this.otpSubmitted.emit({code, verificationType: this.verificationType, type: AuthVerificationType.VERIFICATION });
    }
  }

  public tryAnotherMethod(event: Event): void {
    this.stopEvent(event);
    this.verificationType = this.verificationType !== VerificationType.EMAIL
      ? VerificationType.EMAIL
      : VerificationType.PHONE;
    this.resendOtp();
  }

  override get verificationMessage(): string {
    let verificationMessage: string = 'Code has been sent to your '
    verificationMessage = this.verificationType === VerificationType.EMAIL
      ? verificationMessage.concat(`email address ${this.emailAddress}`)
      : verificationMessage.concat(`phone number ${this.phoneNumber}`);
    return verificationMessage;
  }

  override serviceResendOtp(resendVerificationDto: ResendVerificationCodeDto): Observable<any> {
    return this.authenticationService.resendOtp(resendVerificationDto);
  }

}
