import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfessionalRoutingModule} from './professional-routing.module';
import {ProfessionalGetDetailsComponent} from './component/professional-get-details/professional-get-details.component';
import {
  ProfessionalUpdateDetailsComponent
} from './component/professional-update-details/professional-update-details.component';
import {
  ProfessionalUpdateDocumentsComponent
} from './component/professional-update-documents/professional-update-documents.component';
import {
  ProfessionalRequestVerificationComponent
} from './component/professional-request-verification/professional-request-verification.component';
import {
  ProfessionalCheckVerificationStatusComponent
} from './component/professional-check-verification-status/professional-check-verification-status.component';
import {
  ProfessionalUpdateAvailabilityStatusComponent
} from './component/professional-update-availability-status/professional-update-availability-status.component';
import {
  ProfessionalUpdateAvailabilityComponent
} from './component/professional-update-availability/professional-update-availability.component';
import {ProfessionalBaseComponent} from './component/professional-base/professional-base.component';
import {ProfessionalDashboardComponent} from './component/professional-dashboard/professional-dashboard.component';
import {ProfessionalService} from "./service/professional.service";
import {SharedModule} from "../shared/shared.module";
import {AuthenticationModule} from "../authentication/authentication.module";


@NgModule({
  declarations: [
    ProfessionalGetDetailsComponent,
    ProfessionalUpdateDetailsComponent,
    ProfessionalUpdateDocumentsComponent,
    ProfessionalRequestVerificationComponent,
    ProfessionalCheckVerificationStatusComponent,
    ProfessionalUpdateAvailabilityStatusComponent,
    ProfessionalUpdateAvailabilityComponent,
    ProfessionalBaseComponent,
    ProfessionalDashboardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProfessionalRoutingModule,
    AuthenticationModule
  ],
  providers: [
    ProfessionalService
  ]
})
export class ProfessionalModule { }
