import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../base/guard/auth.guard";
import {HealthSessionBaseComponent} from "./component/health-session-base/health-session-base.component";
import {HealthSessionDashboardComponent} from "./component/health-session-dashboard/health-session-dashboard.component";
import {ViewProfessionalsComponent} from "./component/view-professionals/view-professionals.component";
import {ViewProfessionalDetailComponent} from "./component/view-professional-detail/view-professional-detail.component";
import {
  ViewProfessionalAvailabilityComponent
} from "./component/view-professional-availability/view-professional-availability.component";
import {BookSessionComponent} from "./component/book-session/book-session.component";
import {
  HealthSessionViewSessionsComponent
} from "./component/health-session-view-sessions/health-session-view-sessions.component";
import {RescheduleSessionComponent} from "./component/reschedule-session/reschedule-session.component";
import {CancelSessionComponent} from "./component/cancel-session/cancel-session.component";
import {
  HealthSessionViewSessionDetailComponent
} from "./component/health-session-view-session-detail/health-session-view-session-detail.component";
import {AddSessionReviewComponent} from "./component/add-session-review/add-session-review.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: HealthSessionBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: HealthSessionDashboardComponent, title: 'Health Session Dashboard' },
      { path: 'search-professionals', component: ViewProfessionalsComponent, title: 'Search Professionals' },
      { path: 'view-professional-detail/:id', component: ViewProfessionalDetailComponent, title: 'View Professional Detail' },
      { path: 'view-professional-availability/:id', component: ViewProfessionalAvailabilityComponent, title: 'View Professional Availability' },
      { path: 'professional-book-session/:id', component: BookSessionComponent, title: 'Book Session with Professional' },
      { path: 'view-sessions', component: HealthSessionViewSessionsComponent, title: 'View Health Sessions' },
      { path: 'view-session/detail/:id', component: HealthSessionViewSessionDetailComponent, title: 'View Health Session Detail' },
      { path: 'reschedule-session/:id', component: RescheduleSessionComponent, title: 'Reschedule Session' },
      { path: 'cancel-session/:id', component: CancelSessionComponent, title: 'Cancel Session' },
      { path: 'add-session-review/:id', component: AddSessionReviewComponent, title: 'Add Session Review' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthSessionRoutingModule { }
