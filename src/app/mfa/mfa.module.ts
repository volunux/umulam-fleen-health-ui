import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MfaRoutingModule} from './mfa-routing.module';
import {MfaSetupComponent} from './component/mfa-setup/mfa-setup.component';
import {MfaBaseComponent} from './component/mfa-base/mfa-base.component';
import {MfaDashboardComponent} from './component/mfa-dashboard/mfa-dashboard.component';
import {MfaStatusComponent} from './component/mfa-status/mfa-status.component';
import {SharedModule} from "../shared/shared.module";
import {MfaService} from "./service/mfa.service";
import {AuthenticationModule} from "../authentication/authentication.module";


@NgModule({
  declarations: [
    MfaSetupComponent,
    MfaBaseComponent,
    MfaDashboardComponent,
    MfaStatusComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MfaRoutingModule,
    AuthenticationModule
  ],
  providers: [
    MfaService
  ]
})
export class MfaModule { }
