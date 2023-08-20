import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";
import {OtpVerificationComponent} from "../otp-verification/otp-verification.component";
import {SignUpResponse} from "../../response/sign-up-response";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {

  @ViewChild(OtpVerificationComponent) otpVerificationComponent!: OtpVerificationComponent;
  protected isPreVerificationStage: boolean = false;

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
          next: (result: SignUpResponse): void => {
            this.isPreVerificationStage = true;
            this.authenticationService.setAuthToken(result);
          },
          error: (result): void => {
            this.handleError(result);
          },
          complete: (): void => {
            this.disableSubmitting();
          }
      });
    }
  }

  get $emailAddress(): string {
    return this.signUpForm?.get('emailAddress')?.value;
  }

  get $phoneNumber(): string {
    return this.signUpForm?.get('phoneNumber')?.value;
  }

}
