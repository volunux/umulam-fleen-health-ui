import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {equalsIgnoreCase, isFalsy, isTruthy} from "../../../shared/util/helpers";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";
import {VerificationCodeDto} from "../../../shared/type/authentication";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignInBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpInputComponent!: OtpVerificationComponent;
  protected isOtpVerificationStage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public signIn(): void {
    if (isTruthy(this.signInForm) && this.signInForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.signIn(this.signInForm.value)
        .subscribe({
          next: (result: any): void => {
            this.isOtpVerificationStage = true;
            this.authenticationService.setAuthToken(result);
          },
          error: (result): void => {
            const { error } = result;
            const { type } = error;
            if (isTruthy(type) && equalsIgnoreCase(type, FORM_VALIDATION_ERROR_TYPE)) {
              this.setErrorsFromApiResponse(error.fields);
              return;
            }
            this.errorMessage = error.message;
            this.disableSubmitting();
          },
          complete: (): void => {
            this.disableSubmitting();
          }
        });
    }
  }

  public handleVerificationCode(verification: VerificationCodeDto): void {
    if (isTruthy(verification.code) && this.signInForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.confirmSignUp(verification)
        .subscribe({
          next: (result: any): void => {
            this.authenticationService.setAuthToken(result);
          },
          error: (result): void => {
            const { error } = result;
            this.otpInputComponent.setErrorMessage(error.message);
            this.isSubmitting = false;
          },
          complete: (): void => {
            this.disableSubmitting();
          }
        });
    }
  }

}
