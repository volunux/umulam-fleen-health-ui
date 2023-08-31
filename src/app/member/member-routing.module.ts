import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../base/guard/auth.guard";
import {MemberBaseComponent} from "./component/member-base/member-base.component";
import {MemberDashboardComponent} from "./component/member-dashboard/member-dashboard.component";
import {MemberDetailComponent} from "./component/member-detail/member-detail.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: MemberBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MemberDashboardComponent, title: 'Member Dashboard' },
      { path: 'get-detail', component: MemberDetailComponent, title: 'Member Detail' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
