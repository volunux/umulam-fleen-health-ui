import {Component, OnInit, ViewChild} from '@angular/core';
import {SignInBaseComponent} from "./sign-in-base-component";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {equalsIgnoreCase, isFalsy, isTruthy} from "../../../shared/util/helpers";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends SignInBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isOtpVerificationStage: boolean = false;
  protected phoneNumber: string | undefined;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getOtpComponent(): OtpVerificationComponent {
    return this.otpVerificationComponent;
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

  get $emailAddress(): string {
    return this.signInForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string | undefined {
    return this?.phoneNumber;
  }


}
