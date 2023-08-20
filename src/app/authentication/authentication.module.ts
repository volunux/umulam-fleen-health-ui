import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {AuthenticationRoutingModule} from "./routing/authentication-routing.module";
import {AuthenticationBaseComponent} from './component/authentication-base/authentication-base.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from "./service/authentication.service";
import {OtpVerificationComponent} from "./component/otp-verification/otp-verification.component";
import { MfaVerificationComponent } from './component/mfa-verification/mfa-verification.component';
import { MfaOtpBaseComponent } from './component/mfa-otp-base/mfa-otp-base.component';
import { ChangePasswordComponent } from './component/onboarding-verification/change-password.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AuthenticationBaseComponent,
    OtpVerificationComponent,
    MfaVerificationComponent,
    MfaOtpBaseComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent,
    OtpVerificationComponent,
    AuthenticationRoutingModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
