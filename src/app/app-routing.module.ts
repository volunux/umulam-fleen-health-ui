import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FleenHeatlhComponent} from "./base/component/fleen-heatlh/fleen-heatlh.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./base/guard/auth.guard";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'mfa', loadChildren: () => import('./mfa/mfa.module').then(m => m.MfaModule), canActivate: [AuthGuard] },
  { path: 'professional', loadChildren: () => import('./professional/professional.module').then(m => m.ProfessionalModule), canActivate: [AuthGuard] },
  { path: 'country', loadChildren: () => import('./country/country.module').then(m => m.CountryModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./member/member.module').then(m => m.MemberModule), canActivate: [AuthGuard] },
  { path: "**", component: FleenHeatlhComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
