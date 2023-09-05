import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../base/guard/auth.guard";
import {ProfessionalBaseComponent} from "./component/professional-base/professional-base.component";
import {ProfessionalDashboardComponent} from "./component/professional-dashboard/professional-dashboard.component";
import {ProfessionalGetDetailsComponent} from "./component/professional-get-details/professional-get-details.component";
import {
  ProfessionalUpdateDetailsComponent
} from "./component/professional-update-details/professional-update-details.component";
import {
  ProfessionalUpdateDocumentsComponent
} from "./component/professional-update-documents/professional-update-documents.component";
import {
  ProfessionalUpdateAvailabilityStatusComponent
} from "./component/professional-update-availability-status/professional-update-availability-status.component";
import {
  ProfessionalUpdateAvailabilityComponent
} from "./component/professional-update-availability/professional-update-availability.component";
import {
  ProfessionalRequestVerificationComponent
} from "./component/professional-request-verification/professional-request-verification.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: ProfessionalBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProfessionalDashboardComponent, title: 'Professional Dashboard' },
      { path: 'get-details', component: ProfessionalGetDetailsComponent, title: 'Professional Details' },
      { path: 'update-details', component: ProfessionalUpdateDetailsComponent, title: 'Professional Update Details' },
      { path: 'update-documents', component: ProfessionalUpdateDocumentsComponent, title: 'Professional Update Documents' },
      { path: 'update-availability-status', component: ProfessionalUpdateAvailabilityStatusComponent, title: 'Professional Update Availability Status' },
      { path: 'update-availability', component: ProfessionalUpdateAvailabilityComponent, title: 'Professional Update Availability' },
      { path: 'request-verification', component: ProfessionalRequestVerificationComponent, title: 'Professional Request Verification' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalRoutingModule { }
