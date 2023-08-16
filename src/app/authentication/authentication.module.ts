import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SignInComponent} from './component/sign-in/sign-in.component';
import {AuthenticationRoutingModule} from "./routing/authentication-routing.module";
import {AuthenticationBaseComponent} from './component/authentication-base/authentication-base.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationService} from "./service/authentication.service";


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AuthenticationBaseComponent
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
    AuthenticationRoutingModule
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
