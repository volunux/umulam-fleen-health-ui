import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {equalsIgnoreCase, isFalsy, isTruthy} from "../../../shared/util/helpers";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";
import {VerificationCodeDto} from "../../../shared/type/authentication";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {
  protected isOtpVerificationStage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public signUp(): void {
    if (isTruthy(this.signUpForm) && this.signUpForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.signUp(this.signUpForm.value)
        .subscribe({
          next: (result): void => {
            this.disableSubmitting();
            this.isOtpVerificationStage = true;
          },
          error: (result): void => {
            this.disableSubmitting();
            const { error } = result;
            const { type } = error;
            if (isTruthy(type) && equalsIgnoreCase(type, FORM_VALIDATION_ERROR_TYPE)) {
              this.setErrorsFromApiResponse(error.fields);
              return;
            }
            this.errorMessage = error.message;
          }
      });
    }
  }

  public handleVerificationCode(verification: VerificationCodeDto): void {
    if (isTruthy(verification.code) && this.signUpForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.confirmSignUp(verification)
        .subscribe({
          next: (result): void => {
            this.disableSubmitting();
          },
          error: (result): void => {
            this.disableSubmitting();
            const { error } = result;
            const { type } = error;
            if (isTruthy(type) && equalsIgnoreCase(type, FORM_VALIDATION_ERROR_TYPE)) {
              return;
            }
            this.errorMessage = error.message;
          }
        });
    }
  }

}
