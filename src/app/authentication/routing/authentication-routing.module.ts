import {NgModule} from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "../component/sign-up/sign-up.component";
import {SignInComponent} from "../component/sign-in/sign-in.component";

const resolveSignUpTitle: ResolveFn<string> = () => Promise.resolve('Sign Up');
const resolveSignInTitle: ResolveFn<string> = () => Promise.resolve('Sign In');

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent, title: resolveSignUpTitle },
  { path: "sign-in", component: SignInComponent, title: resolveSignInTitle }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
