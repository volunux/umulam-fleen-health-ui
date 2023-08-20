import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {equalsIgnoreCase, isFalsy, isTruthy} from "../../../shared/util/helpers";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isOtpVerificationStage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public signUp(): void {
    if (isTruthy(this.signUpForm) && this.signUpForm.valid && isFalsy(this.isSubmitting)) {
      this.isSubmitting = true;
      this.authenticationService.signUp(this.signUpForm.value)
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

}
