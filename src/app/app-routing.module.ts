import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FleenHeatlhComponent} from "./base/component/fleen-heatlh/fleen-heatlh.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'country', loadChildren: () => import('./country/country.module').then(m => m.CountryModule) },
  { path: 'profile', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
  { path: "**", component: FleenHeatlhComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
