import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HealthSessionRoutingModule} from './health-session-routing.module';
import {ViewProfessionalsComponent} from './component/view-professionals/view-professionals.component';
import {ViewProfessionalDetailComponent} from './component/view-professional-detail/view-professional-detail.component';
import {
  ViewProfessionalAvailabilityComponent
} from './component/view-professional-availability/view-professional-availability.component';
import {
  ViewProfessionalAvailabilitySessionsComponent
} from './component/view-professional-availability-sessions/view-professional-availability-sessions.component';
import {BookSessionComponent} from './component/book-session/book-session.component';
import {RescheduleSessionComponent} from './component/reschedule-session/reschedule-session.component';
import {CancelSessionComponent} from './component/cancel-session/cancel-session.component';
import {AddSessionReviewComponent} from './component/add-session-review/add-session-review.component';
import {HealthSessionDashboardComponent} from './component/health-session-dashboard/health-session-dashboard.component';
import {HealthSessionBaseComponent} from './component/health-session-base/health-session-base.component';
import {
  HealthSessionViewSessionsComponent
} from './component/health-session-view-sessions/health-session-view-sessions.component';
import {
  HealthSessionViewSessionDetailComponent
} from './component/health-session-view-session-detail/health-session-view-session-detail.component';
import {SharedModule} from "../shared/shared.module";
import {HealthSessionService} from "./service/health-session.service";


@NgModule({
  declarations: [
    ViewProfessionalsComponent,
    ViewProfessionalDetailComponent,
    ViewProfessionalAvailabilityComponent,
    ViewProfessionalAvailabilitySessionsComponent,
    BookSessionComponent,
    RescheduleSessionComponent,
    CancelSessionComponent,
    AddSessionReviewComponent,
    HealthSessionDashboardComponent,
    HealthSessionBaseComponent,
    HealthSessionViewSessionsComponent,
    HealthSessionViewSessionDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HealthSessionRoutingModule
  ],
  providers: [
    HealthSessionService
  ]
})
export class HealthSessionModule { }
