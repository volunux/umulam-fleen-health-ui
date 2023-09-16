import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthSessionRoutingModule } from './health-session-routing.module';
import { ViewProfessionalsComponent } from './component/view-professionals/view-professionals.component';
import { ViewProfessionalDetailComponent } from './component/view-professional-detail/view-professional-detail.component';
import { ViewProfessionalAvailabilityComponent } from './component/view-professional-availability/view-professional-availability.component';
import { ViewProfessionalAvailabilitySessionsComponent } from './component/view-professional-availability-sessions/view-professional-availability-sessions.component';
import { BookSessionComponent } from './component/book-session/book-session.component';
import { RescheduleSessionComponent } from './component/reschedule-session/reschedule-session.component';
import { CancelSessionComponent } from './component/cancel-session/cancel-session.component';
import { AddSessionReviewComponent } from './component/add-session-review/add-session-review.component';


@NgModule({
  declarations: [
    ViewProfessionalsComponent,
    ViewProfessionalDetailComponent,
    ViewProfessionalAvailabilityComponent,
    ViewProfessionalAvailabilitySessionsComponent,
    BookSessionComponent,
    RescheduleSessionComponent,
    CancelSessionComponent,
    AddSessionReviewComponent
  ],
  imports: [
    CommonModule,
    HealthSessionRoutingModule
  ]
})
export class HealthSessionModule { }
