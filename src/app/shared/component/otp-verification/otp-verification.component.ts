import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {codeValidator} from "../../validator/validator";
import {VERIFICATION_CODE} from "../../util/format-pattern";
import {VerificationCodeDto} from "../../type/authentication";

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {

  @Output() public otpSubmitted: EventEmitter<VerificationCodeDto> = new EventEmitter<VerificationCodeDto>();
  public otp: FormControl = new FormControl<any>('', [
    Validators.required, Validators.minLength(1), Validators.maxLength(6), codeValidator(VERIFICATION_CODE)
  ]);

  public constructor() { }

  submit(): void {
    if (this.otp.valid) {
      const code: string = this.otp.value.otp.toString();
      this.otpSubmitted.emit({code, verificationType: 'EMAIL' });
    }
  }


}
