import {NgModule} from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "../component/sign-up/sign-up.component";

const resolveSignUpTitle: ResolveFn<string> = () => Promise.resolve('Sign Up');

const routes: Routes = [
  { path: "sign-up", component: SignUpComponent, title: resolveSignUpTitle }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
