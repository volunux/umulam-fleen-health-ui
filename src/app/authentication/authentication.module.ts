import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import {AuthenticationRoutingModule} from "./routing/authentication-routing.module";
import { AuthenticationBaseComponent } from './component/authentication-base/authentication-base.component';



@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AuthenticationBaseComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent
  ]
})
export class AuthenticationModule { }
