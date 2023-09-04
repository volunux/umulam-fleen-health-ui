import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../base/guard/auth.guard";
import {MfaDashboardComponent} from "./component/mfa-dashboard/mfa-dashboard.component";
import {MfaSetupComponent} from "./component/mfa-setup/mfa-setup.component";
import {MfaBaseComponent} from "./component/mfa-base/mfa-base.component";
import {MfaStatusComponent} from "./component/mfa-status/mfa-status.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: MfaBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MfaDashboardComponent, title: 'Mfa Setup' },
      { path: 'setup-update', component: MfaSetupComponent, title: 'Start and Update Setup' },
      { path: 'check-status', component: MfaStatusComponent, title: 'Check and Update Status' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MfaRoutingModule { }
